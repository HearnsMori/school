"use client";

import { useState, useEffect, useRef } from "react";

type ChangeOrKeyboardEvent = React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>;

export default function Page() {
  const fullText: string = `//implementation("com.squareup.okhttp3:okhttp:4.12.0")
//implementation("com.google.code.gson:gson:2.10.1")
//<uses-permission android:name="android.permission.INTERNET"/>
package com.example.appname;
import android.content.Context;
import android.content.SharedPreferences;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.IOException;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
public class Backend {
    private static final String server1 = "https://dbstorage.onrender.com";
    private static final String server2 = "https://dbstorage.vercel.app";
    private static final String server3 = "https://dbstorage-production.up.railway.app";
    private static final String BASE_URL = server1;
    private static final String PREF_NAME = "app";
    private static final String TOKEN_KEY = "token";
    private static OkHttpClient client;
	public static void init(Context context) {
    	client = new OkHttpClient.Builder().addInterceptor(chain -> {
        	SharedPreferences prefs = context.getSharedPreferences("app", Context.MODE_PRIVATE);
            String token = prefs.getString("token", null);
            Request original = chain.request();
            Request.Builder builder = original.newBuilder.addHeader("Accept", "application/json");
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
            callback.onError("init backend");
            return;
        }
        MediaType JSON = MediaType.get("application/json; charset=utf-8");
        RequestBody requestBody = null;
        if (body != null) {
            requestBody = RequestBody.create(body.toString(), JSON);
        }
        Request.Builder builder = new Request.Builder().url(BASE_URL + endpoint);
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
                else
                    builder.delete();
                break;
            default:
                builder.get();
                break;
        }
        client.newCall(builder.build()).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                callback.onError(e.getMessage());
            }
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String responseString = response.body() != null ? response.body().string() : "";
                if (response.isSuccessful()) {
                    try {
                        JSONObject obj = new JSONObject(responseString);
                        // do something with obj
                    } catch (JSONException e) {
                        e.printStackTrace();
                        callback.onError("JSON parse error: " + e.getMessage());
                        return;
                    }
                    try {
                        callback.onSuccess(responseString);
                    } catch (JSONException e) {
                        throw new RuntimeException(e);
                    }
                } else {
                    callback.onError("Code: " + response.code() + " | " + responseString);
                }
            }
        });
    }
    public interface ApiCallback {
		void onSuccess(String response) throws JSONException;
		void onError(String error);
    }
}
//private static String id;
//Backend.init(this);
//try {
//	JSONObject json = new JSONObject();
//	json.put("id", myEditText.getText().toString());
//	json.put("password", myEditTextPassword.getText().toString());
//	Backend.request("/auth/signin", "POST", json,
//		new Backend.ApiCallback() {
//			@Override
//			public void onSuccess(String response) throws JSONException {
//				Log.d("okhttp", "success: "+response);
//				JSONObject obj = new JSONObject(response);
//              id = obj.getString("id");
//				String token = obj.getString("accessToken");
//              Backend.saveToken(MainActivity.this, token);
//			}
//			@Override
//			public void onError(String error) {
//				Log.d("okhttp", "error: "+error);
//			}
//	    }
//  );
//} catch (Exception e) {
//	log.d("okhttp", e.toString())
//}`;
  const [index, setIndex] = useState<number>(0);
  const [typed, setTyped] = useState<{ char: string; correct: boolean }[]>([]);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Display whitespace symbols
  function displayChar(char: string): string {
    if (char === " ") return "·";
    if (char === "\n") return "↵\n";
    if (char === "\t") return "····";
    return char;
  }

  // Auto-render whitespace immediately after last typed char
  function consumeWhitespace(startIndex: number) {
    let newIndex = startIndex;
    const whitespaceChars: { char: string; correct: boolean }[] = [];

    while (
      newIndex < fullText.length &&
      (
        //fullText[newIndex] === " " ||
        fullText[newIndex] === "\t" ||
        fullText[newIndex]+fullText[newIndex+1] === "  " ||
        fullText[newIndex-1]+fullText[newIndex] === "  "
      )
    ) {
      whitespaceChars.push({
        char: fullText[newIndex],
        correct: true,
      });
      newIndex++;
    }

    if (whitespaceChars.length > 0) {
      setTyped(prev => [...prev, ...whitespaceChars]);
    }

    return newIndex;
  }

  function handleChange(e: ChangeOrKeyboardEvent) {
    var value = (e.target as HTMLInputElement).value;
    if ('key' in e && e.key === 'Enter') {
        value = "\n";
    } else if ('key' in e && e.key === 'Tab') {
        value = "\t";
    }
    if (!value) return;

    let currentIndex = index;
    
    currentIndex = consumeWhitespace(currentIndex);

    if (currentIndex >= fullText.length) return;

    const char = value.slice(-1);
    const expected = fullText[currentIndex];

    if (char === expected) {
      setTyped(prev => [...prev, { char: expected, correct: true }]);
      setCorrectCount(prev => prev + 1);
    } else {
      if(
        expected === " " ||
        expected === "\n" ||
        expected === "\t"
      ) {
        setTyped(prev => [...prev, { char: expected, correct: false }]);
        setWrongCount(prev => prev + 1);
      } else {
        setTyped(prev => [...prev, { char: expected, correct: false }]);
        setWrongCount(prev => prev + 1);
      }
    }

    setIndex(currentIndex + 1);

    // Immediately auto-fill trailing whitespace after this char
    setTimeout(() => {
      setIndex(prev => consumeWhitespace(prev));
    }, 0);

    (e.target as HTMLInputElement).value = "";
  }

  function resetGame() {
    setIndex(0);
    setTyped([]);
    setCorrectCount(0);
    setWrongCount(0);
    inputRef.current?.focus();
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const finished = index >= fullText.length;

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        minHeight: "100vh",
        backgroundColor: "#111",
        color: "white",
        padding: "20px",
        fontFamily: "monospace",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Blind Code Memorization – Auto Whitespace
      </h2>

      <div
        style={{
          backgroundColor: "#1e1e1e",
          padding: "15px",
          borderRadius: "8px",
          whiteSpace: "pre",
          fontSize: "14px",
          lineHeight: "1.6",
          minHeight: "250px",
          overflowX: "auto", // horizontal scroll for long lines
        }}
      >
        {typed.map((item, i) => (
          <span
            key={i}
            style={{
              backgroundColor: item.correct ? "green" : "red",
              color: "white",
            }}
          >
            {displayChar(item.char)}
          </span>
        ))}

        {!finished && (
          <span style={{ borderBottom: "2px solid yellow" }}>▌</span>
        )}

        {finished && (
          <div style={{ marginTop: "10px", color: "#4CAF50" }}>
            Completed.
          </div>
        )}
      </div>

      {/* Hidden input for typing */}
      <input
        ref={inputRef}
        onChange={handleChange}
        onKeyDown={handleChange}
        autoFocus
        style={{
          opacity: 0,
          position: "absolute",
        }}
      />

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p>Correct Letters: {correctCount}</p>
        <p>Wrong Letters: {wrongCount}</p>

        <button
          onClick={resetGame}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            border: "none",
            borderRadius: "6px",
            color: "white",
            fontSize: "14px",
            marginRight: "10px",
          }}
        >
          Restart
        </button>
      </div>

      <p style={{ textAlign: "center", opacity: 0.6, marginTop: "10px" }}>
        Spaces = · | Enter = ↵ | Tab = ⇥ (auto-rendered)
      </p>
    </div>
  );
}
