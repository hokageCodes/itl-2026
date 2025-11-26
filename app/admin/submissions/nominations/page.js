"use client";

import { useState, useEffect } from 'react';
import { Award, Search, Download, Trash2, File, FileText } from 'lucide-react';

export default function NominationsPage() {
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchNominations();
  }, []);

  const fetchNominations = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/nominations');
      const data = await res.json();
      if (data.success) {
        setNominations(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching nominations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, nomineeName) => {
    try {
      const res = await fetch(`/api/admin/nominations?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setNominations(nominations.filter(nom => nom._id !== id));
        setDeleteConfirm(null);
      } else {
        alert('Failed to delete nomination');
      }
    } catch (err) {
      console.error('Error deleting nomination:', err);
      alert('Error deleting nomination');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredNominations = nominations.filter((nom) =>
    nom.nominatorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nom.nominatorEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nom.nomineeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nom.nomineeEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nom.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = async () => {
    try {
      const res = await fetch('/api/admin/nominations/export');
      if (!res.ok) {
        throw new Error('Export failed');
      }
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nominations-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting:', err);
      alert('Failed to export nominations. Please try again.');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Nominations</h1>
            <p className="text-neutral-600">Manage award nominations ({nominations.length} total)</p>
          </div>
          {nominations.length > 0 && (
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-neutral-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by nominator, nominee, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Confirm Delete</h3>
            <p className="text-neutral-600 mb-4">
              Are you sure you want to delete the nomination for <strong>{deleteConfirm.nomineeName}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id, deleteConfirm.nomineeName)}
                className="px-4 py-2 bg-danger-600 text-white rounded-lg hover:bg-danger-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-pulse text-neutral-500">Loading nominations...</div>
          </div>
        ) : filteredNominations.length === 0 ? (
          <div className="p-12 text-center text-neutral-500">
            <Award className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
            <p>{searchTerm ? 'No nominations match your search' : 'No nominations yet'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Nominator
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Nominee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredNominations.map((nom) => (
                  <tr key={nom._id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">{nom.nominatorName || 'N/A'}</div>
                      <div className="text-xs text-neutral-500">{nom.nominatorEmail || ''}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">{nom.nomineeName || 'N/A'}</div>
                      <div className="text-xs text-neutral-500">{nom.nomineeEmail || ''}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700">
                        {nom.category || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {nom.fileName || nom.supportingDocument ? (
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary-600" />
                          <div className="text-sm">
                            <div className="font-medium text-neutral-900">{nom.fileName || 'File uploaded'}</div>
                            {nom.supportingDocument && !nom.fileName && (
                              <div className="text-xs text-neutral-500">{nom.supportingDocument}</div>
                            )}
                            {nom.fileName && (nom.fileUrl || nom.filePublicId) && (
                              <a
                                href={`/api/admin/nominations/files/${nom._id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary-600 hover:text-primary-700 underline"
                              >
                                Download
                              </a>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-neutral-400 italic">No file</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-600">{formatDate(nom.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setDeleteConfirm({ id: nom._id, nomineeName: nom.nomineeName })}
                        className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

