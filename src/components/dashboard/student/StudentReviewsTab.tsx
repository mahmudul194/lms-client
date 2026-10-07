"use client";

import React, { useState, useEffect } from "react";
import { Star, Plus, Edit2, Trash2, X, Save } from "lucide-react";
import { reviewsApi, enrollmentsApi } from "@/services/api";

export default function StudentReviewsTab() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
    batchId: "",
  });

  const fetchData = async () => {
    try {
      // In a real app, reviewsApi.getAllReviews() for a student would return only their reviews.
      // Or there might be a getMyReviews() method. For now we use getAllReviews.
      const [rRes, eRes] = await Promise.all([
        reviewsApi.getAllReviews(),
        enrollmentsApi.getMyEnrollments()
      ]);
      
      if (rRes.statusCode === 200 && rRes.data) {
        setReviews(rRes.data);
      }
      if (eRes.statusCode === 200 && eRes.data) {
        setEnrollments(eRes.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ rating: 5, comment: "", batchId: "" });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setFormData({ 
      rating: item.rating || 5, 
      comment: item.comment || "", 
      batchId: item.batch?.id || "" 
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        await reviewsApi.deleteReview(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { ...formData, rating: Number(formData.rating) };
      if (!body.batchId) delete (body as any).batchId;

      let res;
      if (isEditing && currentId) {
        res = await reviewsApi.updateReview(currentId, body);
      } else {
        res = await reviewsApi.createReview(body);
      }

      if (res.statusCode === 200 || res.statusCode === 201) {
        setIsFormOpen(false);
        fetchData();
      } else {
        alert("Failed to save review");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Star className="w-6 h-6 text-amber-500" />
            <span>My Reviews</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Share your feedback about the courses and batches.</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={handleOpenAdd}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 shrink-0"
          >
            <Plus className="w-4 h-4 text-sky-300" />
            <span>Write a Review</span>
          </button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-6">
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              {isEditing ? <Edit2 className="w-5 h-5 text-[#0077b6]" /> : <Star className="w-5 h-5 text-[#0077b6]" />}
              {isEditing ? "Edit Review" : "Write a Review"}
            </h3>
            <button onClick={() => setIsFormOpen(false)} className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  required
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 transition-all font-medium text-slate-900 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Select Batch (Optional)</label>
                <select
                  value={formData.batchId}
                  onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 transition-all font-medium text-slate-900 bg-slate-50 focus:bg-white appearance-none cursor-pointer"
                >
                  <option value="">Select Batch...</option>
                  {enrollments.map((enr) => (
                    <option key={enr.batch?.id || Math.random()} value={enr.batch?.id}>
                      {enr.batch?.name} - {enr.batch?.course?.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Your Comment</label>
              <textarea
                required
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:ring-2 focus:ring-[#0077b6]/20 transition-all font-medium text-slate-900 bg-slate-50 focus:bg-white h-32 resize-y"
                placeholder="Share your experience..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#0077b6] hover:bg-[#023e8a] text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Save className="w-5 h-5" />
                {isEditing ? "Save Changes" : "Post Review"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-extrabold border-b border-slate-200">
              <tr>
                <th className="p-4">Rating</th>
                <th className="p-4">Comment</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {reviews.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center text-amber-500 font-black">
                      {item.rating} / 5
                    </div>
                  </td>
                  <td className="p-4 text-slate-800">
                    <div className="max-w-xs truncate">{item.comment}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                      {item.batch?.name || "N/A"}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                        title="Edit Review"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">
                    You haven't written any reviews yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
