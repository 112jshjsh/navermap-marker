export async function GET() {
    const ncpKeyId = process.env.NCP_CLIENT_ID;

    if (!ncpKeyId) {
        return new Response(
        JSON.stringify({ error: 'NCP: API key not found' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
        JSON.stringify({ keyId: ncpKeyId }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}