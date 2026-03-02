"use client";

import { useState, useEffect } from "react";

export default function Home() {

  const fullText = `package com.example.codea;

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

    private static final String BASE_URL = "https://dbstorage.onrender.com";
    private static final String PREF_NAME = "app";
    private static final String TOKEN_KEY = "token";

    private static OkHttpClient client;

    public static void init(Context context) {

        client = new OkHttpClient.Builder()
                .addInterceptor(chain -> {
                    SharedPreferences prefs = context.getSharedPreferences("app", Context.MODE_PRIVATE);
                    String token = prefs.getString("token", null);

                    Request original = chain.request();
                    Request.Builder builder = original.newBuilder()
                            .addHeader("Accept", "application/json");

                    if (token != null) {
                        builder.addHeader("Authorization", "Bearer " + token);
                    }

                    return chain.proceed(builder.build());
                })
                .connectTimeout(30, java.util.concurrent.TimeUnit.SECONDS)
                .readTimeout(30, java.util.concurrent.TimeUnit.SECONDS)
                .writeTimeout(30, java.util.concurrent.TimeUnit.SECONDS)
                .build();
    }

    public static void saveToken(Context context, String token) {
        SharedPreferences prefs =
                context.getSharedPreferences("app", Context.MODE_PRIVATE);
        prefs.edit().putString(TOKEN_KEY, token).apply();
    }

    public static void request(
            String endpoint,
            String method,
            JSONObject body,
            ApiCallback callback
    ) {

        if (client == null) {
            callback.onError("BackendService not initialized");
            return;
        }

        MediaType JSON = MediaType.get("application/json; charset=utf-8");
        RequestBody requestBody = null;

        if (body != null) {
            requestBody = RequestBody.create(body.toString(), JSON);
        }

        Request.Builder builder = new Request.Builder()
                .url(BASE_URL + endpoint);

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
                    callback.onSuccess(responseString);
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
}`;

  const [hiddenWord, setHiddenWord] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  function generateBlank() {
    const words = fullText.match(/\b[A-Za-z_]+\b/g);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setHiddenWord(randomWord);

    const regex = new RegExp("\\b" + randomWord + "\\b", "g");
    const blanked = fullText.replace(regex, "_____");

    setDisplayText(blanked);
    setInput("");
    setMessage("");
  }

  function checkAnswer() {
    if (input.trim() === hiddenWord) {
      setScore(score + 1);
      setMessage("Correct! Next word...");
      setTimeout(generateBlank, 1000);
    } else {
      setMessage("Wrong. Try again.");
    }
  }

  useEffect(() => {
    generateBlank();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#111",
      color: "white",
      padding: "20px",
      fontFamily: "monospace"
    }}>

      <h1 style={{ textAlign: "center" }}>Code Memorization Game</h1>

      <div style={{
        backgroundColor: "#1e1e1e",
        padding: "20px",
        borderRadius: "8px",
        whiteSpace: "pre-wrap",
        marginBottom: "20px",
        fontSize: "14px",
        lineHeight: "1.5",
        maxHeight: "60vh",
        overflowY: "auto"
      }}>
        {displayText}
      </div>

      <div style={{ textAlign: "center" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type missing word"
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "250px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "none"
          }}
        />

        <button
          onClick={checkAnswer}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white"
          }}
        >
          Check
        </button>
      </div>

      <p style={{ textAlign: "center", marginTop: "15px" }}>
        {message}
      </p>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Score: {score}
      </p>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={generateBlank}
          style={{
            padding: "8px 15px",
            backgroundColor: "#2196F3",
            border: "none",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer"
          }}
        >
          New Word
        </button>
      </div>

    </div>
  );
}
