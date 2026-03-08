"use client";

import { useState, useEffect, useRef } from "react";

type ChangeOrKeyboardEvent = React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>;

export default function Page() {
  const fullText: string = `//implementation("androidx.appcompat:appcompat:1.6.1")
//implementation("com.google.android.material:material:1.11.0")
//implementation("androidx.constraintlayout:constraintlayout:2.1.4")
//implementation("androidx.recyclerview:recyclerview:1.3.2")
//implementation("androidx.core:core:1.12.0")
//<style name="Theme.MyApp" parent="Theme.Material3.DayNight.NoActionBar"/>
//<application android:theme="@style/Theme.MyApp">
//repositories {
//	google()
//	mavenCentral()
//}
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle|oval|line|ring">
    <solid android:color="#FFFFFF"/>
    <gradient
        android:startColor="#FF6F00"
        android:centerColor="#FFA000"
        android:endColor="#FFD54F"
        android:angle="45"
        android:type="linear"
        android:gradientRadius="200dp"/>
    <stroke
        android:width="3dp"
        android:color="#EEEEEE"
        android:dashWidth="6dp"
        android:dashGap="4dp"/>
    <corners
        android:radius="16dp"
        android:topLeftRadius="24dp"
        android:topRightRadius="24dp"
        android:bottomLeftRadius="8dp"
        android:bottomRightRadius="8dp"/>
    <padding
        android:left="12dp"
        android:top="12dp"
        android:right="12dp"
        android:bottom="12dp"/>
    <size
        android:width="200dp"
        android:height="120dp"/>
</shape>
X view = (X) findViewById(R.id.view);
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
});
Intent intent = new Intent(this, X.class);
intent.putExtra("a", "a");
intent.putExtra("b", 0);
startActivity(intent);
Bundle extras = getIntent().getExtras();
if (extras != null) {
    String a = extras.getString("a");
    int b = extras.getInt("b");
}
List<MyItem> data = new ArrayList<>();
data.add(new MyItem("Android", "Operating System", R.drawable.ic_android));
data.add(new MyItem("Java", "Programming Language", R.drawable.ic_java));
recyclerView.setLayoutManager(new LinearLayoutManager(this));
recyclerView.setLayoutManager(new GridLayoutManager(this, 2));
MyAdapter adapter = new MyAdapter(data);
recyclerView.setAdapter(adapter);
public class MyItem {
    String title;
    String description;
    int imageRes; // e.g., R.drawable.icon
    public MyItem(String title, String description, int imageRes) {
        this.title = title;
        this.description = description;
        this.imageRes = imageRes;
    }
}
public class MyAdapter extends RecyclerView.Adapter<MyAdapter.MyViewHolder> {
    private List<MyItem> itemList;
    public MyAdapter(List<MyItem> itemList) {
        this.itemList = itemList;
    }
    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_layout, parent, false);
        return new MyViewHolder(view);
    }
    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        MyItem currentItem = itemList.get(position);
        holder.title.setText(currentItem.title);
        holder.desc.setText(currentItem.description);
        holder.img.setImageResource(currentItem.imageRes);
        holder.itemView.setOnClickListener(v -> {
            Toast.makeText(v.getContext(), "Clicked: " + currentItem.title, Toast.LENGTH_SHORT).show();
            LayoutInflater inflater = getLayoutInflater();
            View layout = inflater.inflate(R.layout.custom_toast, findViewById(R.id.custom_toast_container));
            TextView text = layout.findViewById(R.id.toast_text);
            text.setText(message);
            Toast toast = new Toast(getApplicationContext());
            toast.setDuration(Toast.LENGTH_LONG);
            toast.setView(layout);
            toast.show();
            new AlertDialog.Builder(this)
                .setTitle("A")
                .setMessage("a?")
                .setPositiveButton("Yes", (dialog, which) -> {
                    //do
                })
                .setNegativeButton("No", null)
                .setIcon(R.drawable.a)
                .show();
        });
    }
    @Override
    public int getItemCount() {
        return itemList.size();
    }
    public static class MyViewHolder extends RecyclerView.ViewHolder {
        TextView title, desc;
        ImageView img;
        public MyViewHolder(View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.itemTitle);
            desc = itemView.findViewById(R.id.itemDesc);
            img = itemView.findViewById(R.id.itemImage);
        }
    }
}
WebSettings webSettings = myWebView.getSettings();
webSettings.setJavaScriptEnabled(true);
X.loadUrl("https://www.google.com");
String customHtml = "<html><body><h1>Hello World!</h1></body></html>";
X.loadData(customHtml, "text/html", "UTF-8");
X.getUrl();
X.getTitle();
private Handler handler = new Handler(Looper.getMainLooper());
private int index = 0;
private String fullText = "";
private long delay = 100;
public void animateText(String textToType) {
    fullText = textToType;
    index = 0;
    myTextView.setText("");
    handler.removeCallbacks(characterAdder);
    handler.postDelayed(characterAdder, delay);
}
private Runnable characterAdder = new Runnable() {
    @Override
    public void run() {
        myTextView.setText(fullText.subSequence(0, index++));
        if (index <= fullText.length()) {
            handler.postDelayed(characterAdder, delay);
        }
    }
};
protected void on(Start|Resume|Pause|Stop|Destroy)() {
    super.onX();
}`;
  
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
        fullText[newIndex-1]+fullText[newIndex] === "//" ||
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
