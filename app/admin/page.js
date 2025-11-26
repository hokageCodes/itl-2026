"use client";

import { useState, useEffect } from 'react';
import { FileText, Users, TrendingUp, Activity, Award } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [stats, setStats] = useState({
    registrations: 0,
    volunteers: 0,
    sponsors: 0,
    nominations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [regRes, volRes, sponRes, nomRes] = await Promise.all([
        fetch('/api/admin/registrations'),
        fetch('/api/admin/volunteers'),
        fetch('/api/admin/sponsors'),
        fetch('/api/admin/nominations'),
      ]);

      const regData = await regRes.json();
      const volData = await volRes.json();
      const sponData = await sponRes.json();
      const nomData = await nomRes.json();

      setStats({
        registrations: regData.success ? regData.data?.length || 0 : 0,
        volunteers: volData.success ? volData.data?.length || 0 : 0,
        sponsors: sponData.success ? sponData.data?.length || 0 : 0,
        nominations: nomData.success ? nomData.data?.length || 0 : 0,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalSubmissions = stats.registrations + stats.volunteers + stats.sponsors + stats.nominations;

  const statCards = [
    {
      title: 'Total Submissions',
      value: loading ? '...' : totalSubmissions.toString(),
      icon: FileText,
      color: 'primary',
      href: null,
    },
    {
      title: 'Registrations',
      value: loading ? '...' : stats.registrations.toString(),
      icon: Users,
      color: 'accent',
      href: '/admin/submissions/registrations',
    },
    {
      title: 'Volunteers',
      value: loading ? '...' : stats.volunteers.toString(),
      icon: Activity,
      color: 'success',
      href: '/admin/submissions/volunteers',
    },
    {
      title: 'Sponsors',
      value: loading ? '...' : stats.sponsors.toString(),
      icon: TrendingUp,
      color: 'warning',
      href: '/admin/submissions/sponsors',
    },
    {
      title: 'Nominations',
      value: loading ? '...' : stats.nominations.toString(),
      icon: Award,
      color: 'accent',
      href: '/admin/submissions/nominations',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Overview</h1>
        <p className="text-neutral-600">Welcome to the admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            primary: 'bg-primary-50 text-primary-700',
            accent: 'bg-accent-50 text-accent-700',
            success: 'bg-success-50 text-success-700',
            warning: 'bg-warning-50 text-warning-700',
          };

          const CardContent = (
            <div className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-neutral-600 mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
            </div>
          );

          return stat.href ? (
            <Link key={stat.title} href={stat.href}>
              {CardContent}
            </Link>
          ) : (
            <div key={stat.title}>{CardContent}</div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/submissions/registrations"
            className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <h3 className="font-semibold text-neutral-900 mb-1">Registrations</h3>
            <p className="text-sm text-neutral-600">View and manage registrations</p>
          </Link>
          <Link
            href="/admin/submissions/volunteers"
            className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <h3 className="font-semibold text-neutral-900 mb-1">Volunteers</h3>
            <p className="text-sm text-neutral-600">Review volunteer applications</p>
          </Link>
        </div>
      </div>
    </div>
  );
}


function MediaUploader() {
  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    // REPLACE with your cloudinary upload preset and cloud name in env and expose them to client via next config or a small endpoint
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!uploadPreset || !cloudName) {
      alert('Cloudinary not configured (set NEXT_PUBLIC_CLOUDINARY_* env variables)');
      return;
    }
    form.append('file', file);
    form.append('upload_preset', uploadPreset);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    if (data?.secure_url) {
      alert('Uploaded: ' + data.secure_url);
    } else {
      alert('Upload failed');
    }
  }
  return (
    <div className="flex items-center gap-3">
      <input type="file" onChange={handleFile} />
    </div>
  );
}
