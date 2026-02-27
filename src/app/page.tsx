"use client";

import { useState } from "react";
import {
  motion,
  Reorder,
  AnimatePresence,
  LayoutGroup,
} from "framer-motion";
import {
  Columns,
  Layout,
  Settings2,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Expand,
  MoreHorizontal,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

/* ---------------- TYPES ---------------- */

type Field = {
  id: string;
  label: string;
  span: number;
  value: string;
  required?: boolean;
};

/* ---------------- DEFAULT LAYOUT (4 COLUMN EXAMPLE) ---------------- */
/*
First Name → 2
Last Name  → 2
Street 1   → 4
City       → 3
State      → 1
*/

const defaultFields: Field[] = [
  { id: "first", label: "First Name", span: 2, value: "", required: true },
  { id: "last", label: "Last Name", span: 2, value: "", required: true },
  { id: "street", label: "Street 1", span: 4, value: "", required: true },
  { id: "city", label: "City", span: 3, value: "", required: true },
  { id: "state", label: "State / Province", span: 1, value: "", required: true },
];

export default function Page() {
  /* ---------------- STATE ---------------- */

  const [snap, setSnap] = useState(true);
  const [columns, setColumns] = useState(4);
  const [horizontal, setHorizontal] = useState(false);
  const [rowHeight, setRowHeight] = useState(90);
  const [fields, setFields] = useState<Field[]>(defaultFields);
  const [status, setStatus] = useState<"idle" | "success" | "failure">("idle");

  /* ---------------- FORM LIFECYCLE ---------------- */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const invalid = fields.some(
      (f) => f.required && f.value.trim() === ""
    );

    if (invalid) {
      setStatus("failure");
    } else {
      setStatus("success");
    }
  };

  const handleReset = () => {
    setFields(defaultFields);
    setSnap(true);
    setColumns(4);
    setHorizontal(false);
    setRowHeight(90);
    setStatus("idle");
  };

  /* ---------------- MOVE UP / DOWN ---------------- */

  const moveField = (index: number, direction: "up" | "down") => {
    const newFields = [...fields];
    const target =
      direction === "up" ? index - 1 : index + 1;

    if (target < 0 || target >= fields.length) return;

    [newFields[index], newFields[target]] =
      [newFields[target], newFields[index]];

    setFields(newFields);
  };

  /* ---------------- STYLES ---------------- */

  const container: React.CSSProperties = {
    minHeight: "100vh",
    padding: "40px",
    background: "#f3f4f6",
    fontFamily: "Inter, sans-serif",
    color: "black",
  };

  const grid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: "16px",
    background: "#fff",
    padding: "30px",
    borderRadius: 18,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  };

  const card = (span: number): React.CSSProperties => ({
    gridColumn: snap
      ? `span ${span}`
      : `span ${Math.min(span + 1, columns)}`,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 16,
    height: rowHeight,
    display: "flex",
    flexDirection: horizontal ? "row" : "column",
    justifyContent: "center",
    gap: 8,
    boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
  });

  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    border: "1px solid #d1d5db",
  };

  /* ---------------- UI ---------------- */

  return (
    <div style={container}>
      <LayoutGroup>

        <motion.h1 layout style={{ fontSize: 30, fontWeight: 700 }}>
          Designing the Form Control
        </motion.h1>

        <motion.p layout style={{ marginBottom: 20, color: "#6b7280" }}>
          Choose Snap to Columns, Columns (4 / 6 / 12), Layout direction,
          reorder via drag-and-drop or Move Up/Down, and adjust row height.
          6 or 12 columns provide the most sizing flexibility.
        </motion.p>

        {/* STATUS */}
        <AnimatePresence>
          {status !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                padding: 14,
                borderRadius: 10,
                marginBottom: 20,
                display: "flex",
                gap: 8,
                alignItems: "center",
                background:
                  status === "failure" ? "#fee2e2" : "#dcfce7",
                color:
                  status === "failure" ? "#b91c1c" : "#166534",
              }}
            >
              {status === "failure" ? (
                <>
                  <AlertCircle size={18} />
                  onFailure: Required fields missing.
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  Form Submitted Successfully.
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTROL PANEL */}
        <div style={{
          background: "#fff",
          padding: 20,
          borderRadius: 16,
          marginBottom: 30,
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          display: "flex",
          gap: 30,
          flexWrap: "wrap"
        }}>
          <Control
            icon={<Settings2 size={18} />}
            label="Snap to Columns"
          >
            <button
              onClick={() => setSnap(!snap)}
              style={buttonStyle(snap)}
            >
              {snap ? "Locked Width" : "Flexible Width"}
            </button>
          </Control>

          <Control icon={<Columns size={18} />} label="Columns">
            <select
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              style={selectStyle}
            >
              <option value={4}>4 Columns</option>
              <option value={6}>6 Columns</option>
              <option value={12}>12 Columns</option>
            </select>
          </Control>

          <Control icon={<Layout size={18} />} label="Layout">
            <button
              onClick={() => setHorizontal(!horizontal)}
              style={buttonStyle(horizontal)}
            >
              {horizontal ? "Horizontal" : "Vertical"}
            </button>
          </Control>

          <Control icon={<Expand size={18} />} label="Row Height">
            <input
              type="range"
              min={70}
              max={160}
              value={rowHeight}
              onChange={(e) =>
                setRowHeight(Number(e.target.value))
              }
            />
          </Control>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <Reorder.Group
            axis="y"
            values={fields}
            onReorder={setFields}
            style={grid}
          >
            <AnimatePresence>
              {fields.map((field, index) => (
                <Reorder.Item
                  key={field.id}
                  value={field}
                  layout
                  style={card(field.span)}
                >
                  <div style={{ display: "flex", gap: 6 }}>
                    <GripVertical size={16} />
                    <strong>{field.label}</strong>
                    <MoreHorizontal size={16} />
                  </div>

                  <input
                    style={inputStyle}
                    placeholder={`Enter ${field.label}`}
                    value={field.value}
                    onChange={(e) =>
                      setFields((prev) =>
                        prev.map((f) =>
                          f.id === field.id
                            ? { ...f, value: e.target.value }
                            : f
                        )
                      )
                    }
                  />

                  {/* Span + Move Controls */}
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      type="button"
                      onClick={() => moveField(index, "up")}
                      style={miniBtn}
                    >
                      <ArrowUp size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => moveField(index, "down")}
                      style={miniBtn}
                    >
                      <ArrowDown size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFields((prev) =>
                          prev.map((f) =>
                            f.id === field.id && f.span < columns
                              ? { ...f, span: f.span + 1 }
                              : f
                          )
                        )
                      }
                      style={miniBtn}
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFields((prev) =>
                          prev.map((f) =>
                            f.id === field.id && f.span > 1
                              ? { ...f, span: f.span - 1 }
                              : f
                          )
                        )
                      }
                      style={miniBtn}
                    >
                      −
                    </button>
                  </div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>

          {/* ACTIONS */}
          <div style={{ marginTop: 30, display: "flex", gap: 12 }}>
            <button type="submit" style={primaryBtn}>
              Submit
            </button>

            <button
              type="reset"
              style={{ ...primaryBtn, background: "#6b7280" }}
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </form>
      </LayoutGroup>
    </div>
  );
}

/* ---------------- SMALL COMPONENT ---------------- */

function Control({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div style={{ display: "flex", gap: 6 }}>
        {icon}
        <strong>{label}</strong>
      </div>
      <div style={{ marginTop: 8 }}>{children}</div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const buttonStyle = (active: boolean): React.CSSProperties => ({
  padding: "8px 14px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  background: active ? "#4f46e5" : "#9ca3af",
  color: "white",
});

const primaryBtn: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: 10,
  border: "none",
  background: "#4f46e5",
  color: "white",
  cursor: "pointer",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  gap: 6,
};

const miniBtn: React.CSSProperties = {
  padding: 6,
  borderRadius: 6,
  border: "1px solid #d1d5db",
  background: "#f9fafb",
  cursor: "pointer",
};

const selectStyle: React.CSSProperties = {
  padding: 8,
  borderRadius: 8,
};