"use client";

import { useState, useEffect, useRef } from "react";

type ChangeOrKeyboardEvent = React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>;

export default function Page() {
  const fullText: string = `X view = (X) findViewById(R.id.view);
X.setText("a");
X.setText(String.format("a %s", "User"));
X.setTextColor(Color.RED);
X.setTextSize(0f);
X.setText(Html.fromHtml("<a>a</a>", Html.FROM_HTML_MODE_LEGACY));
X.setImageResource(R.drawable.X);
X.getText().toString().isEmpty();
X.length();
X.setEnabled(true); // Gray out the button (user can't click)
X.setCheckable(true); // Makes it behave like a ToggleButton (stays pressed)
X.setBackgroundColor(Color.RED);
X.setOnClickListener(v -> {
    //do
});
X.setOnLongClickListener(v -> {
    //do
    return true; 
});
X.addTextChangedListener(new TextWatcher() {
    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {
        //do
    }
    @Override
    public void afterTextChanged(Editable s) {}
});
X.setChecked(true);
X.isChecked();
X.toggle();
X.setOnCheckedChangeListener((buttonView, isChecked) -> {
    if (isChecked) {
        //do
    } else {
        //do
    }
});
X.setOnCheckedChangeListener((group, checkedId) -> {
    if (checkedId == R.id.X) {
        //do
    }
});
X.setNestedScrollingEnabled(false)
X.smoothScrollTo(0, 0);
X.getScrollX();
X.setOnScrollChangeListener((NestedScrollView.OnScrollChangeListener) 
    (v, scrollX, scrollY, oldScrollX, oldScrollY) -> {
    if (scrollY > oldScrollY) {
        //do
    }
    View child = v.getChildAt(v.getChildCount() - 1);
    int diff = (child.getBottom() - (v.getHeight() + v.getScrollY()));
    if (diff == 0) {
        //do end of content
    }
});
X.setMinValue(0);
X.setMaxValue(0);
X.setValue(0);
X.setOnValueChangedListener((picker, oldVal, newVal) -> {
    //do
});
X.setIs24HourView(true);
X.setOnTimeChangedListener((view, hourOfDay, minute) -> {
    //do
});
X.init(2026, 2, 11, (view, year, monthOfYear, dayOfMonth) -> {
    //do
});
String[] a = {"USA", "UK", "UAE", "Uruguay", "Uzbekistan"};
ArrayAdapter<String> adapter = new ArrayAdapter<>(this, 
    android.R.layout.simple_dropdown_item_1line, a);
X.setAdapter(adapter);
X.setThreshold(1);
X.setOnItemClickListener((parent, view, position, id) -> {
    //do
});
X.setAdapter(adapter);
X.setTokenizer(new MultiAutoCompleteTextView.CommaTokenizer());
X.setOnItemClickListener((parent, view, position, id) -> {
    //do
});
X.setProgress(0);
X.setIndeterminate(true);
X.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
    @Override
    public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
        //do
    }
    @Override public void onStartTrackingTouch(SeekBar seekBar) {}
    @Override public void onStopTrackingTouch(SeekBar seekBar) {}
});
X.setOnRatingBarChangeListener((bar, rating, fromUser) -> {
    //do
});`;
  
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
        fullText[newIndex]+fullText[newIndex+1] === "//" ||
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
