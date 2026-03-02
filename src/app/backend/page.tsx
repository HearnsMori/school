"use client";

import { useState, useEffect, useRef } from "react";

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
}`;

  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const inputRef = useRef(null);

  function displayChar(char) {
    if (char === " ") return "·";
    if (char === "\n") return "↵\n";
    return char;
  }

  function handleChange(e) {
    const value = e.target.value;
    if (!value) return;

    const char = value.slice(-1);
    if (index >= fullText.length) return;

    const expected = fullText[index];

    if (char === expected) {
      setTyped(prev => [...prev, { char: expected, correct: true }]);
      setCorrectCount(prev => prev + 1);
    } else {
      setTyped(prev => [...prev, { char: expected, correct: false }]);
      setWrongCount(prev => prev + 1);
    }

    setIndex(prev => prev + 1);
    e.target.value = "";
  }

  function resetGame() {
    setIndex(0);
    setTyped([]);
    setCorrectCount(0);
    setWrongCount(0);
    inputRef.current.focus();
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const finished = index >= fullText.length;

  return (
    <div
      onClick={() => inputRef.current.focus()}
      style={{
        minHeight: "100vh",
        backgroundColor: "#111",
        color: "white",
        padding: "20px",
        fontFamily: "monospace"
      }}
    >

      <h2 style={{ textAlign: "center" }}>
        Blind Code Memorization Mode
      </h2>

      <div
        style={{
          backgroundColor: "#1e1e1e",
          padding: "15px",
          borderRadius: "8px",
          whiteSpace: "pre-wrap",
          fontSize: "14px",
          lineHeight: "1.6",
          minHeight: "250px"
        }}
      >
        {typed.map((item, i) => (
          <span
            key={i}
            style={{
              backgroundColor: item.correct ? "green" : "red",
              color: "white"
            }}
          >
            {displayChar(item.char)}
          </span>
        ))}

        {!finished && (
          <span
            style={{
              borderBottom: "2px solid yellow"
            }}
          >
            ▌
          </span>
        )}

        {finished && (
          <div style={{ marginTop: "10px", color: "#4CAF50" }}>
            Completed.
          </div>
        )}
      </div>

      {/* Hidden Mobile Input */}
      <input
        ref={inputRef}
        onChange={handleChange}
        autoFocus
        style={{
          opacity: 0,
          position: "absolute"
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
            fontSize: "14px"
          }}
        >
          Restart
        </button>
      </div>

      <p style={{ textAlign: "center", marginTop: "15px", opacity: 0.6 }}>
        Tap anywhere to focus. Spaces show as · and new lines as ↵
      </p>

    </div>
  );
}
