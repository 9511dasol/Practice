"use client";

import React, { useState, useRef } from "react";

const files = [
  {
    name: "Energy_Q1_BD_2025.xlsx",
    status: "success",
    message: "방글라데시 공장 · 자동 입력 완료",
  },
  {
    name: "Energy_Q1_IN_2025.xlsx",
    status: "error",
    message: "인도 공장 · 데이터 형식 오류",
  },
  {
    name: "Energy_Q1_VN_2025.xlsx",
    status: "warning",
    message: "베트남 공장 · 일부 데이터 누락",
  },
];

const EsgDataUploadCard = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 드래그 이벤트 핸들러
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // 드롭 이벤트 핸들러
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  // 파일 선택 버튼 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50/50">
        <span className="text-[13px] font-black text-slate-800 flex items-center gap-2">
          <i className="bx bx-cloud-upload text-blue-600 text-lg"></i>
          데이터 업로드
        </span>
        <button className="text-[10px] font-bold text-blue-600 hover:underline">
          양식 다운로드
        </button>
      </div>

      <div className="p-4">
        {/* 실제 파일 업로드 영역 */}
        <form
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
          className="relative"
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".xlsx, .csv"
            onChange={handleChange}
          />

          <div
            className={`group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/30"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <i
              className={`bx ${uploadedFile ? "bx-file text-blue-600" : "bx-cloud-upload text-slate-400"} text-3xl mb-2 transition-transform group-hover:-translate-y-1`}
            ></i>

            {uploadedFile ? (
              <div className="text-center">
                <p className="text-[12px] font-black text-slate-800">
                  {uploadedFile.name}
                </p>
                <p className="text-[10px] text-blue-600 font-bold mt-1">
                  파일이 선택되었습니다.
                </p>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="mt-3 text-[10px] font-bold text-rose-500 hover:text-rose-700 underline"
                >
                  취소 후 다시 선택
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-[12px] font-black text-slate-700">
                  표준 양식 엑셀 업로드
                </p>
                <p className="mt-1 text-[10px] text-slate-400 font-medium">
                  파일을 이 곳으로 끌어다 놓거나{" "}
                  <span
                    onClick={onButtonClick}
                    className="text-blue-600 font-bold underline cursor-pointer"
                  >
                    클릭하여 선택
                  </span>
                  하세요.
                </p>
              </div>
            )}
          </div>
        </form>

        {/* 하단 태그 정보 */}
        <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
          {[".xlsx", ".csv", "표준양식 v2"].map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500 ring-1 ring-inset ring-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 최근 업로드 결과 피드백 스타일 */}
        <div className="space-y-2 border-t border-slate-50 pt-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            Recent Success
          </h4>
          {files.map((file) => (
            <div
              key={file.name}
              className={`flex items-center gap-2 text-[11px] font-medium ${file.status === "success" ? "text-green-600" : file.status === "error" ? "text-rose-600" : "text-amber-600"}`}
            >
              <i
                className={`bx ${file.status === "success" ? "bx-check-circle" : file.status === "error" ? "bx-x-circle" : "bx-error"} text-lg`}
              ></i>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-slate-800 truncate">
                  {file.name}
                </p>
                <p className="text-[9px] text-emerald-600 font-bold">
                  {file.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EsgDataUploadCard;

