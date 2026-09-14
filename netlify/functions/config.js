const headers={"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"};
exports.handler=async()=>({statusCode:200,headers,body:JSON.stringify({
mode:process.env.OPENAI_API_KEY&&process.env.DEMO_MODE!=="true"?"production":"demo",
openaiConfigured:Boolean(process.env.OPENAI_API_KEY),
supabaseConfigured:Boolean(process.env.SUPABASE_URL&&process.env.SUPABASE_ANON_KEY),
whatsappConfigured:Boolean(process.env.WHATSAPP_ACCESS_TOKEN&&process.env.WHATSAPP_PHONE_NUMBER_ID&&process.env.META_GRAPH_API_VERSION&&process.env.AUTH_REQUIRED==="true"),
n8nConfigured:Boolean(process.env.N8N_WEBHOOK_URL&&process.env.N8N_WEBHOOK_SECRET),
metaConfigured:Boolean(process.env.META_APP_SECRET&&process.env.META_WEBHOOK_VERIFY_TOKEN&&process.env.META_GRAPH_API_VERSION),
googleAdsConfigured:Boolean(process.env.GOOGLE_ADS_DEVELOPER_TOKEN&&process.env.GOOGLE_ADS_CUSTOMER_ID),
supabaseUrl:process.env.SUPABASE_URL||"",
supabaseAnonKey:process.env.SUPABASE_ANON_KEY||"",
authRequired:process.env.AUTH_REQUIRED==="true",
version:"2.0.0"
})});