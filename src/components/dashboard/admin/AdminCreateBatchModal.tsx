"use client";

import React from "react";
import AdminAddBatchView from "./AdminAddBatchView";
import { CreateBatchPayload } from "@/services/api/batchesApi";

interface AdminCreateBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (batch: CreateBatchPayload) => Promise<void>;
}

export default function AdminCreateBatchModal({
  isOpen,
  onClose,
  onCreate,
}: AdminCreateBatchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white rounded-3xl relative z-10 max-h-[90vh] overflow-y-auto">
        <AdminAddBatchView onBack={onClose} onAdd={onCreate} />
      </div>
    </div>
  );
}
