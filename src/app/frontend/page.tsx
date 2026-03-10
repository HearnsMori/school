"use client";

import { useState, useEffect, useRef } from "react";

type ChangeOrKeyboardEvent = React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>;

export default function Page() {
  const [fullText, setFullText] = useState("");
  var fullTextArray = [`
//implementation("androidx.recyclerview:recyclerview:1.3.2")
//implementation("androidx.appcompat:appcompat:1.6.1")
//implementation("androidx.core:core:1.12.0")
//implementation("androidx.constraintlayout:constraintlayout:2.1.4")
//implementation("com.google.android.material:material:1.11.0")
//<style name="Theme.MyApp" parent="Theme.Material3.DayNight.NoActionBar"/>
//<application android:theme="@style/Theme.MyApp">
//repositories {
//	google()
//	mavenCentral()
//}
//<activity android:name=".YourActivityName" />`, `
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle|oval|line|ring">
    <solid android:color="#FFFFFF"/>
    <gradient
        android:startColor="#FFFFFF"
        android:centerColor="#FFFFFF"
        android:endColor="#FFFFFF"
        android:angle="1"
        android:type="linear"
        android:gradientRadius="1dp"/>
    <stroke
        android:width="1dp"
        android:color="#FFFFFF"
        android:dashWidth="1dp"
        android:dashGap="1dp"/>
    <corners
        android:radius="1dp"
        android:topLeftRadius="1dp"
        android:topRightRadius="1dp"
        android:bottomLeftRadius="1dp"
        android:bottomRightRadius="1dp"/>
    <padding
        android:left="1dp"
        android:top="1dp"
        android:right="1dp"
        android:bottom="1dp"/>
    <size
        android:width="1dp"
        android:height="1dp"/>
</shape>`, `
View X = (View) findViewById(R.id.X);
X.setText("a");
X.setText(String.format("%s %d", "a", 1));
X.setText(Html.fromHtml("<b>a</b>", Html.FROM_HTML_MODE_LEGACY));
X.setTextColor(Color.RED);
X.setTextSize(1f);
X.setImageResource(R.drawable.X);
X.getText().toString().isEmpty();s
X.length();
X.setEnabled(true);
X.setCheckable(true);
X.setBackgroundColor(Color.RED);
X.setChecked(true);
X.isChecked();
X.toggle();
X.setNestedScrollingEnabled(false)
X.smoothScrollTo(1, 1);
X.getScrollX();
X.setMinValue(1);
X.setMaxValue(1);
X.setValue(1);
X.setIs24HourView(true);
X.setProgress(1);
X.setIndeterminate(true);`, `
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
})
X.setOnValueChangedListener((picker, oldVal, newVal) -> {
    //do
});
X.setOnTimeChangedListener((view, hourOfDay, minute) -> {
    //do
});
X.init(2026, 2, 11, (view, year, monthOfYear, dayOfMonth) -> {
    //do
});
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
});`, `
Intent intent = new Intent(this, X.class);
intent.putExtra("a", "a");
intent.putExtra("b", 1);
startActivity(intent);
Bundle extras = getIntent().getExtras();
if (extras != null) {
    String a = extras.getString("a");
    int b = extras.getInt("b");
}`, `
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
});`, `
public class MainActivity extends AppCompatActivity {
    RecyclerView recyclerView;
    List<ItemData> dataList;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
        //recyclerView.setLayoutManager(new GridLayoutManager(this, 2));
        //recyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));
        dataList = new ArrayList<>();
        dataList.add(new ItemData("a", R.drawable.a, 1));
        MyAdapter adapter = new MyAdapter(dataList);
        recyclerView.setAdapter(adapter);
    }
    static class ItemData {
        String name;
        int imageRes;
        int number;
        ItemData(String name, int imageRes, int number) {
            this.name = name;
            this.imageRes = imageRes;
            this.number = number;
        }
    }
    static class MyAdapter extends RecyclerView.Adapter<MyAdapter.ViewHolder> {
        List<ItemData> list;
        MyAdapter(List<ItemData> list) {
            this.list = list;
        }
        @NonNull
        @Override
        public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_layout, parent, false); // create item_layout.xml with TextView and ImageView
            return new ViewHolder(view);
        }
        @Override
        public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
            ItemData item = list.get(position);
            holder.textView.setText(item.name + " (" + item.number + ")");
            holder.imageView.setImageResource(item.imageRes);
            holder.itemView.setOnClickListener(v -> {
                Toast.makeText(v.getContext(), "Clicked: " + item.name, Toast.LENGTH_SHORT).show();
            });
        }
        @Override
        public int getItemCount() {
            return list.size();
        }
        static class ViewHolder extends RecyclerView.ViewHolder {
            TextView textView;
            ImageView imageView;
            ViewHolder(@NonNull View itemView) {
                super(itemView);
                textView = itemView.findViewById(R.id.itemText);
                imageView = itemView.findViewById(R.id.itemImage);
            }
        }
    }
}`, `
    @Override
    public void onBackPressed() {
        new AlertDialog.Builder(this)
                .setTitle("Exit App")
                .setMessage("Are you sure you want to exit?")
                .setCancelable(true)
                .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        finish();
                    }
                })
                .setNegativeButton("No", null)
                .show();
    }
`, `
res/menu/my_menu.xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/option1"
        android:title="Option 1"
        android:icon="@drawable/ic_option1"
        android:showAsAction="never"/>

    <item
        android:id="@+id/option2"
        android:title="Option 2"
        android:icon="@drawable/ic_option2"
        android:showAsAction="never"/>

</menu>
PopupMenu popup = new PopupMenu(this, myButton);
popup.getMenuInflater().inflate(R.menu.my_menu, popup.getMenu());
popup.setOnMenuItemClickListener(item -> {
    switch(item.getItemId()) {
        case R.id.option1: 
            //do
            return true;
        case R.id.option2:
            //do
            return true;
    }
    return false;
});
popup.show();`, `
WebSettings webSettings = myWebView.getSettings();
webSettings.setJavaScriptEnabled(true);
X.loadUrl("https://www.google.com");
String customHtml = "<html><body><h1>Hello World!</h1></body></html>";
X.loadData(customHtml, "text/html", "UTF-8");
X.getUrl();
X.getTitle();`, `
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
};`, `
protected void on(Start|Resume|Pause|Stop|Destroy)() {
    super.onX();
}`];
    useEffect(()=>{
      const u = prompt(`
      1 Implementation and Start
      2 Shape
      3 View function
      4 Listener
      5 Intent
      6 Adapter
      7 Clickable Recycler View
      8 Back Press Dialogue
      9 Popup Menu
      10 Web
      11 Handler
      12 onScreenCycle
      `, "0");
      setFullText(fullTextArray[Number(u)-1]);
    }, []);
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
