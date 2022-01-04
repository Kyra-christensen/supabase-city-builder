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



export async function getCity() {
    const response = await client
        .from('cities')
        .select()
        .match({ user_id: client.auth.user().id, })
        .single();
    
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

export async function updateWaterfront(newWaterId) {
    const user = await getUser();
    console.log(newWaterId, user.user.id);
    const response = await client
        .from('cities')
        .update({ waterfront_id: newWaterId })
        .match({ user_id: user.user.id })
        .single();
    return checkError(response);
}

export async function updateSkyline(newSkylineId) {
    const user = await getUser();
    console.log(newSkylineId, user.user.id);
    const response = await client
        .from('cities')
        .update({ skyline_id: newSkylineId })
        .match({ user_id: user.user.id })
        .single();
    return checkError(response);
}

export async function updateCastle(newCastleId) {
    const user = await getUser();
    console.log(newCastleId, user.user.id);
    const response = await client
        .from('cities')
        .update({ castle_id: newCastleId })
        .match({ user_id: user.user.id })
        .single();
    return checkError(response);
}

export async function updateName(newName) {
    const user = await getUser();

    const response = await client
        .from('cities')
        .update({ name: newName })
        .match({ user_id: user.user.id })
        .single();
    
    return checkError(response);
}

export async function updateSlogans(slogansArray) {
    const user = await getUser();

    const response = await client
        .from('cities')
        .update({ slogans: slogansArray })
        .match({ user_id: user.user.id })
        .single();
    
    return checkError(response);
}
function checkError({ data, error }) {
    return error ? console.error(error) : data;
}