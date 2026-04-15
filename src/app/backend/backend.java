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
new JSONArray();

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatDelegate;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.Iterator;
import java.util.Map;
import java.util.HashMap;

public class AppUtils {

    private static SharedPreferences prefs;
    private static SharedPreferences.Editor editor;
    private static final String PREF_NAME = "CodefestDataStore";

    // 1. INITIALIZATION (Call this in MainActivity onCreate)
    public static void init(Context context) {
        if (prefs == null) {
            prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
            editor = prefs.edit();
        }
    }

    // 2. AUTHENTICATION (Mocked via SharedPreferences for Hackathon)
    public static boolean signupUser(String name, String password) {
        if (prefs.contains("USER_" + name)) return false; // User exists
        editor.putString("USER_" + name, password).apply();
        return true;
    }

    public static boolean loginUser(String name, String password) {
        String savedPass = prefs.getString("USER_" + name, null);
        return savedPass != null && savedPass.equals(password);
    }

    public static boolean signupAdmin(String name, String password) {
        if (prefs.contains("ADMIN_" + name)) return false; 
        editor.putString("ADMIN_" + name, password).apply();
        return true;
    }

    public static boolean loginAdmin(String name, String password) {
        String savedPass = prefs.getString("ADMIN_" + name, null);
        return savedPass != null && savedPass.equals(password);
    }

    // 3. NoSQL-STYLE STORAGE
    public static void setItem(String collection, String key, String value) {
        try {
            String colStr = prefs.getString("COL_" + collection, "{}");
            JSONObject jsonObject = new JSONObject(colStr);
            jsonObject.put(key, value);
            editor.putString("COL_" + collection, jsonObject.toString()).apply();
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public static String getItem(String collection, String key) {
        try {
            String colStr = prefs.getString("COL_" + collection, "{}");
            JSONObject jsonObject = new JSONObject(colStr);
            return jsonObject.optString(key, null);
        } catch (JSONException e) {
            return null;
        }
    }

    public static void setCollection(String collection, Map<String, String> data) {
        JSONObject jsonObject = new JSONObject(data);
        editor.putString("COL_" + collection, jsonObject.toString()).apply();
    }

    public static Map<String, String> getCollection(String collection) {
        Map<String, String> map = new HashMap<>();
        try {
            String colStr = prefs.getString("COL_" + collection, "{}");
            JSONObject jsonObject = new JSONObject(colStr);
            Iterator<String> keys = jsonObject.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                map.put(key, jsonObject.getString(key));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return map;
    }

    // 4. UI / THEME CONTROLS
    public static void toggleMode(String mode) {
        if (mode.equalsIgnoreCase("Dark")) {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
        } else {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        }
    }

    // 5. HACKATHON LIFESAVERS (Extras)
    public static void showToast(Context context, String message) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
    }

    public static void hideKeyboard(Activity activity) {
        View view = activity.getCurrentFocus();
        if (view != null) {
            InputMethodManager imm = (InputMethodManager) activity.getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
        }
    }

    public static boolean isNetworkAvailable(Context context) {
        ConnectivityManager connectivityManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager != null ? connectivityManager.getActiveNetworkInfo() : null;
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
    }
}

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 1. Initialize the Utils FIRST (Crucial!)
        AppUtils.init(this);

        // --- AUTHENTICATION EXAMPLES ---
        
        // Simulating a new student signup
        boolean isSignedUp = AppUtils.signupUser("hearns_mori", "securePass123");
        if (isSignedUp) {
            AppUtils.showToast(this, "Account created successfully!");
        }

        // Logging in
        if (AppUtils.loginUser("hearns_mori", "securePass123")) {
            AppUtils.showToast(this, "Welcome to NurSYNC!");
        } else {
            AppUtils.showToast(this, "Invalid credentials.");
        }


        // --- STORAGE EXAMPLES ---

        // Saving a single item (e.g., tracking a specific flashcard deck's status)
        AppUtils.setItem("Flashcards", "anatomy_deck", "completed");
        
        // Retrieving that item later
        String status = AppUtils.getItem("Flashcards", "anatomy_deck");
        // status will equal "completed"

        // Saving an entire collection at once using a Map (e.g., student module progress)
        Map<String, String> moduleProgress = new HashMap<>();
        moduleProgress.put("pharmacology", "85%");
        moduleProgress.put("pathophysiology", "92%");
        moduleProgress.put("patient_care", "100%");
        
        AppUtils.setCollection("UserProgress_hearns", moduleProgress);

        // Fetching the collection back
        Map<String, String> savedProgress = AppUtils.getCollection("UserProgress_hearns");
        String pharmaScore = savedProgress.get("pharmacology"); // returns "85%"


        // --- UI & EXTRAS EXAMPLES ---
        
        // Toggling Dark Mode on a button click
        findViewById(R.id.btn_dark_mode).setOnClickListener(v -> {
            AppUtils.toggleMode("Dark");
        });

        // Checking internet before making an API call to a FastAPI backend
        if (!AppUtils.isNetworkAvailable(this)) {
            AppUtils.showToast(this, "No internet! Check your connection.");
        }
        
        // Hiding keyboard after a user types in a search bar
        findViewById(R.id.btn_search).setOnClickListener(v -> {
            AppUtils.hideKeyboard(this);
            // execute search...
        });
    }
}







