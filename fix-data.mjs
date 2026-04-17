/**
 * Quick fix script: Clean corrupted data in Supabase and verify storage bucket.
 * Run: node fix-data.mjs
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ftyajgzvzccxfdzulvot.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0eWFqZ3p2emNjeGZkenVsdm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5OTcxNjcsImV4cCI6MjA5MTU3MzE2N30.3kGYr-6IWZXsEsBb5jKeWkZ97jpkmUeN7zQf04a9KAc';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  console.log('=== STEP 1: Read current site_content ===');
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .eq('id', 'abais')
    .single();

  if (error) {
    console.error('Read error:', error);
    return;
  }

  console.log('Current content keys:', Object.keys(data.content || {}));
  console.log('Hero image:', data.content?.hero?.image);
  console.log('Hero badge:', data.content?.hero?.badge);
  console.log('Counters:', JSON.stringify(data.content?.counters));

  // Fix corrupted hero.image ("Mengunggah..." -> default)
  const content = data.content || {};
  if (content.hero && (content.hero.image === 'Mengunggah...' || !content.hero.image || content.hero.image === '')) {
    content.hero.image = '/assets/images/hero-banner.png';
    console.log('FIXED: hero.image reset to default');
  }

  // Fix counters (ensure numbers, not strings)
  if (content.counters) {
    content.counters = content.counters.map(c => ({
      ...c,
      number: parseInt(c.number) || 0,
    }));
    console.log('FIXED: counters number types');
  }

  console.log('\n=== STEP 2: Update cleaned data ===');
  const { error: updateErr } = await supabase
    .from('site_content')
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq('id', 'abais');

  if (updateErr) {
    console.error('Update error:', updateErr);
  } else {
    console.log('SUCCESS: Data cleaned and updated');
  }

  // Verify
  const { data: verify } = await supabase
    .from('site_content')
    .select('content')
    .eq('id', 'abais')
    .single();
  
  console.log('\n=== VERIFICATION ===');
  console.log('Hero image now:', verify.content?.hero?.image);
  console.log('Counters now:', JSON.stringify(verify.content?.counters));

  // Test storage bucket
  console.log('\n=== STEP 3: Check/Create storage bucket ===');
  const { data: buckets, error: bucketsErr } = await supabase.storage.listBuckets();
  if (bucketsErr) {
    console.error('Bucket list error:', bucketsErr);
  } else {
    console.log('Existing buckets:', buckets.map(b => b.name));
    const hasImages = buckets.some(b => b.name === 'images');
    if (!hasImages) {
      console.log('Creating "images" bucket...');
      const { data: newBucket, error: createErr } = await supabase.storage.createBucket('images', {
        public: true,
        fileSizeLimit: 2097152, // 2MB
      });
      if (createErr) {
        console.error('Create bucket error:', createErr);
      } else {
        console.log('SUCCESS: "images" bucket created');
      }
    } else {
      console.log('"images" bucket already exists');
    }
  }

  // Test upload capability
  console.log('\n=== STEP 4: Test upload capability ===');
  const testBlob = new Blob(['test'], { type: 'text/plain' });
  const { data: uploadData, error: uploadErr } = await supabase.storage
    .from('images')
    .upload('test-upload.txt', testBlob, { upsert: true });
  
  if (uploadErr) {
    console.error('Upload test FAILED:', uploadErr.message);
    console.log('⚠️ Storage upload NOT working - RLS policy may be needed');
  } else {
    console.log('Upload test SUCCESS');
    // Clean up test file
    await supabase.storage.from('images').remove(['test-upload.txt']);
  }
}

main().catch(console.error);
