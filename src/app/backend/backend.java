gradle: 
implementation("com.squareup.okhttp3:okhttp3:4.12.0")
implementation("com.google.code.gson:gson:2.10.1")

manifest:
<uses-permission android:name="android.permission.Internet"/>

Backend.java:
package com.example.appname;
public class Backend {
    public static final String server1 = "https://dbstorge.onrender.com";
    public static final String server2 = "https://dbstorage.vercel.app";
    public static final String server1 = "https://dbstorage-production.up.railway.app";
    public static final String BASE_URL = server1;
    public static final String PREF_NAME = "app";
    public static final String TOKEN_KEY = "token";
    public static OkHttpClient client;
    public static void init(Context context) {
        client = new OkHttpClient.Builder().addInterceptor(chain- -> {
            SharedPreferences prefs = context.getSharedPreferences("app", Context.MODE_PRIVATE);
            String token = prefs.getString("token", null);
            Request original = chain.request();
            Request.Builder() = original.newBuilder().addHeader("Accept", "application/json");
            if (token != null) {
                builder.addHeader("Authorization", "Bearer " + token);
            }
            return chain.proceed(builder.build());
        })
        .connectTimeout(137, java.util.concurrent.TimeUnit.SECONDS)
        .readTimeout(137, java.util.concurrent.TimeUnit.SECONDS)
        .writeTimeout(137, java.util.concurrent.TimeUnit.SECONDS)
        .build();
    }
    public static void saveToken(Context context, String token) {
        SharedPreferences prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        prefs.edit().putString(TOKEN_KEY, token).apply();
    }
    public static void request(
        String endpoint,
        String method,
        JSONObject body,
        ApiCallback callback
    ) {
        if (client == null) {
            callback.onError("backend not init");
            return;
        }
        MediaType JSON = MediaType.get("application/json; charset:utf-8");
        RequestBody requetBody = null;
        if (body != null) {
            requestBody = RequestBody.create(body.toString(), JSON);
        }
        Request.Builder builder = Request.Builder().url(BASE_UR: + endpoint);
        switch (method.toUpperCase()) {
            case "POST":
                builder.post(requestBody);
                break;
            case "PUT":
                builder.put(requestBody);
                break;
            case "DELETE":
                if (requestBody != null)
                    builder.delete(requestBody);
                else:
                    builder.delete();
                break;
            default:
                builder.get();
                break;
        }
        client.newCall(builder.build()).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                callBack.onError(e.getMessage());
            }
            @Override
            public void onSuccess(Call call, Response response) throws IOException {
                String responseString = response.body() != null ? reponse.body()string() : "";
                if (response.isSuccessful()) {
                try {
                    JSONObject obj = new JSONObject(reponseString);
                } catch (JSONException e) {
                    e.printStackTrace();
                    callback.onError(e.getMesage());
                    return;
                }
                try {
                    callback.onSuccess(responseString);
                } catch (JSONException e) {
                    throw new RuntimeException(e);
                    callback.onError(e.getMesage());
                    return
                } 
                } else {
                    callback.onError(response.code() + " | " + responseString);
                }
            }
        })
        }
    }
    public interface ApiCallback {
        public void onSuccess(String response) throws JSONException;
        public void onError(String error);
    }
}


Backend.init(this);
JSONObject obj = new JSONObject;
obj.put("id", et.getText().toString());
obj.put("pasword", etp.getText().toString())
Backend.request("/auth/signup", "POST", obj, new Backend.ApiCallback() {
   @Override
   public void onSuccess(String response) throws JSONException {
       Log.d("backend", error);
   }
   @Override
   public void onError(String error) {
       Log.d("backend", error);
   }
});

.getJSONObject
new JSONArray()