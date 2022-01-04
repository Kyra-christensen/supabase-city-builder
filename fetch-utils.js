const SUPABASE_URL = 'https://ritiyenwzsalzpktroey.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwODg4NCwiZXhwIjoxOTU1MDg0ODg0fQ.Yn9Ken8agdL7K8NpTPyu81cBonK6zQDKTwIrFdY-xwM';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./city');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

export async function getCity() {
    const response = await client
        .from('cities')
        .select()
        .match({ user_id: client.auth.user().id, })
        .single();
    console.log(response);
    return checkError(response);
}

export async function createDefaultCity() {
    const response = await client
        .from('cities')
        .insert([
            {
                name: 'Seattle',
                waterfront_id: 1,
                skyline_id: 1,
                castle_id: 1,
                slogans: []
            }
        ]);
    
    return checkError(response);
}