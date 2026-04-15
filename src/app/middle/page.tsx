"use client";

import { useState, useEffect, useRef } from "react";

type ChangeOrKeyboardEvent = React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>;

export default function Page() {
  const fullText: string = `import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.view.GestureDetector;
import android.view.MotionEvent;
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
    public static void init(Context context) {
        if (prefs == null) {
            prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
            editor = prefs.edit();
        }
    }
    public static boolean signupUser(String name, String password) {
        if (prefs.contains("USER_" + name)) return false; 
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
    public static void toggleMode(String mode) {
        if (mode.equalsIgnoreCase("Dark")) {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
        } else {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        }
    }
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
    public static class OnSwipeTouchListener implements View.OnTouchListener {
        private final GestureDetector gestureDetector;
        public OnSwipeTouchListener(Context context) {
            gestureDetector = new GestureDetector(context, new GestureListener());
        }
        @Override
        public boolean onTouch(View v, MotionEvent event) {
            v.performClick();
            return gestureDetector.onTouchEvent(event);
        }
        private final class GestureListener extends GestureDetector.SimpleOnGestureListener {
            private static final int SWIPE_THRESHOLD = 100;
            private static final int SWIPE_VELOCITY_THRESHOLD = 100;
            @Override
            public boolean onDown(MotionEvent e) {
                return true; 
            }
            @Override
            public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
                boolean result = false;
                try {
                    float diffY = e2.getY() - e1.getY();
                    float diffX = e2.getX() - e1.getX();
                    if (Math.abs(diffX) > Math.abs(diffY)) {
                        if (Math.abs(diffX) > SWIPE_THRESHOLD && Math.abs(velocityX) > SWIPE_VELOCITY_THRESHOLD) {
                            if (diffX > 0) {
                                onSwipeRight();
                            } else {
                                onSwipeLeft();
                            }
                            result = true;
                        }
                    } else if (Math.abs(diffY) > SWIPE_THRESHOLD && Math.abs(velocityY) > SWIPE_VELOCITY_THRESHOLD) {
                        if (diffY > 0) {
                            onSwipeBottom();
                        } else {
                            onSwipeTop();
                        }
                        result = true;
                    }
                } catch (Exception exception) {
                    exception.printStackTrace();
                }
                return result;
            }
            @Override
            public boolean onDoubleTap(MotionEvent e) {
                onDoubleClick();
                return true;
            }
        }
        public void onSwipeRight() {}
        public void onSwipeLeft() {}
        public void onSwipeTop() {}
        public void onSwipeBottom() {}
        public void onDoubleClick() {}
    }
    public interface OnItemClickListener<T> {
        void onItemClick(T item, int position);
    }
    public static abstract class GenericAdapter<T> extends androidx.recyclerview.widget.RecyclerView.Adapter<GenericAdapter.ViewHolder> {
        protected java.util.List<T> list;
        protected java.util.List<T> listFull;
        private final int layoutId;
        private final OnItemClickListener<T> listener;
        public GenericAdapter(int layoutId, java.util.List<T> list, OnItemClickListener<T> listener) {
            this.layoutId = layoutId;
            this.list = list;
            this.listFull = new java.util.ArrayList<>(list);
            this.listener = listener;
        }
        @NonNull
        @Override
        public ViewHolder onCreateViewHolder(@NonNull android.view.ViewGroup parent, int viewType) {
            android.view.View v = android.view.LayoutInflater.from(parent.getContext()).inflate(layoutId, parent, false);
            return new ViewHolder(v);
        }
        @Override
        public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
            T item = list.get(position);
            bindData(holder, item);
            holder.itemView.setOnClickListener(v -> listener.onItemClick(item, position));
        }
        @Override
        public int getItemCount() { return list.size(); }
        public abstract void bindData(ViewHolder holder, T item);
        public static class ViewHolder extends androidx.recyclerview.widget.RecyclerView.ViewHolder {
            public ViewHolder(android.view.View v) { super(v); }
            public <V extends android.view.View> V find(int id) { 
                return itemView.findViewById(id); 
            }
        }
        public void filter(String query, FilterLogic<T> logic) {
            list.clear();
            if (query.isEmpty()) {
                list.addAll(listFull);
            } else {
                for (T item : listFull) {
                    if (logic.onFilter(item, query.toLowerCase())) {
                        list.add(item);
                    }
                }
            }
            notifyDataSetChanged();
        }
        public interface FilterLogic<T> {
            boolean onFilter(T item, String query);
        }
    }
}
public class Module {
    public String name;
    public int iconResId;
    public Module(String name, int icon) {
        this.name = name;
        this.iconResId = icon;
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
        AppUtils.init(this);
        boolean isSignedUp = AppUtils.signupUser("hearns_mori", "securePass123");
        if (isSignedUp) {
            AppUtils.showToast(this, "Account created successfully!");
        }
        if (AppUtils.loginUser("hearns_mori", "securePass123")) {
            AppUtils.showToast(this, "Welcome to NurSYNC!");
        } else {
            AppUtils.showToast(this, "Invalid credentials.");
        }
        AppUtils.setItem("Flashcards", "anatomy_deck", "completed");
        String status = AppUtils.getItem("Flashcards", "anatomy_deck");
        Map<String, String> moduleProgress = new HashMap<>();
        moduleProgress.put("pharmacology", "100%");;
        AppUtils.setCollection("UserProgress_hearns", moduleProgress);
        Map<String, String> savedProgress = AppUtils.getCollection("UserProgress_hearns");
        String pharmaScore = savedProgress.get("pharmacology");
        findViewById(R.id.btn_dark_mode).setOnClickListener(v -> {
            AppUtils.toggleMode("Dark");
        });
        if (!AppUtils.isNetworkAvailable(this)) {
            AppUtils.showToast(this, "No internet! Check your connection.");
        }
        findViewById(R.id.btn_search).setOnClickListener(v -> {
            AppUtils.hideKeyboard(this);
        });
        View mySwipeableView = findViewById(R.id.my_swipe_container);
        mySwipeableView.setOnTouchListener(new AppUtils.OnSwipeTouchListener(this) {
            @Override
            public void onSwipeRight() {
                super.onSwipeRight();
                AppUtils.showToast(MainActivity.this, "Swiped Right!");
            }
            @Override
            public void onSwipeLeft() {
                super.onSwipeLeft();
                AppUtils.showToast(MainActivity.this, "Swiped Left!");
            }
            @Override
            public void onDoubleClick() {
                super.onDoubleClick();
            }
        });
    }
    List<Module> myData = new ArrayList<>();
    myData.add(new Module("Cardiology", R.drawable.ic_heart));
    myData.add(new Module("Neurology", R.drawable.ic_brain));
    AppUtils.GenericAdapter<Module> adapter = new AppUtils.GenericAdapter<Module>(
        R.layout.item_custom_layout, 
        myData, 
        (item, pos) -> AppUtils.showToast(this, "Clicked " + item.name)
    ) {
        @Override
        public void bindData(ViewHolder holder, Module item) {
            TextView txt = holder.find(R.id.module_name);
            ImageView img = holder.find(R.id.module_icon);
            txt.setText(item.name);
            img.setImageResource(item.iconResId);
        }
    };
    recyclerView.setAdapter(adapter);
    searchBar.addTextChangedListener(new TextWatcher() {
        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {
            adapter.filter(s.toString(), (item, query) -> 
                item.name.toLowerCase().contains(query)
            );
        }
        //...
    });
}
`;
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
