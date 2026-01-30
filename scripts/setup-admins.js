const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' }); // Try .env.local first
require('dotenv').config({ path: '.env' });       // Fallback to .env

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env or .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const users = [
  {
    email: 'admin@vacheresse.com',
    password: 'password',
    role: 'admin',
    name: 'Admin Vacheresses'
  },
  {
    email: 'superadmin@startindev.com',
    password: 'password',
    role: 'super_admin',
    name: 'Super Admin'
  }
];

async function setupAdmins() {
  console.log('Starting admin setup...');

  for (const user of users) {
    console.log(`Checking user: ${user.email}`);
    
    // Check if user exists by trying to sign in (not perfect but works if we don't have listUsers)
    // Actually, with service_role we can list users or just try to create.
    // listUsers is cleaner.
    
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
        console.error('Error listing users:', listError);
        continue;
    }

    const existingUser = existingUsers.users.find(u => u.email === user.email);

    if (existingUser) {
      console.log(`User ${user.email} already exists. Updating metadata/role...`);
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        { user_metadata: { role: user.role, name: user.name } }
      );
      if (updateError) console.error(`Failed to update ${user.email}:`, updateError);
      else console.log(`Updated ${user.email}`);
    } else {
      console.log(`Creating user ${user.email}...`);
      const { data, error: createError } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: { role: user.role, name: user.name }
      });

      if (createError) {
        console.error(`Failed to create ${user.email}:`, createError);
      } else {
        console.log(`Created ${user.email} successfully.`);
      }
    }
  }
  
  console.log('Admin setup complete.');
}

setupAdmins();
