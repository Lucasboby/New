const headers={"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"};
exports.handler=async()=>({statusCode:200,headers,body:JSON.stringify({
mode:process.env.OPENAI_API_KEY&&process.env.DEMO_MODE!=="true"?"production":"demo",
openaiConfigured:Boolean(process.env.OPENAI_API_KEY),
supabaseConfigured:Boolean(process.env.SUPABASE_URL&&process.env.SUPABASE_ANON_KEY),
supabaseUrl:process.env.SUPABASE_URL||"",
supabaseAnonKey:process.env.SUPABASE_ANON_KEY||"",
authRequired:process.env.AUTH_REQUIRED==="true",
version:"2.0.0"
})});