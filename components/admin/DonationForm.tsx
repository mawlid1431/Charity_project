import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Save, Image as ImageIcon, MapPin, Calendar, FileText, DollarSign, Activity, Upload, Loader, Link } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';

interface Donation {
    id: string;
    name: string;
    location: string;
    date: string;
    description: string;
    image: string;
    targetAmount: number;
    raisedAmount: number;
    donationLink: string;
    status: 'active' | 'completed' | 'paused';
}

interface DonationFormProps {
    darkMode: boolean;
    donation: Donation | null;
    onSave: (donation: Omit<Donation, 'id'>) => void;
    onCancel: () => void;
}

export function DonationForm({ darkMode, donation, onSave, onCancel }: DonationFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        date: '',
        description: '',
        image: '',
        targetAmount: 0,
        raisedAmount: 0,
        donationLink: '',
        status: 'active' as 'active' | 'completed' | 'paused'
    });

    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    useEffect(() => {
        if (donation) {
            setFormData({
                name: donation.name,
                location: donation.location || '',
                date: donation.date || '',
                description: donation.description,
                image: donation.image,
                targetAmount: donation.targetAmount,
                raisedAmount: donation.raisedAmount,
                donationLink: donation.donationLink || '',
                status: donation.status
            });
            setImagePreview(donation.image);
        }
    }, [donation]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // If there's a new image file, upload it first
        if (imageFile) {
            setUploading(true);
            const imageUrl = await uploadImage(imageFile);
            if (imageUrl) {
                formData.image = imageUrl;
            }
            setUploading(false);
        }

        onSave(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'targetAmount' || name === 'raisedAmount' ? parseFloat(value) || 0 : value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            setImageFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `donations/${fileName}`;

            // Upload to Supabase Storage
            const { error } = await supabase.storage
                .from('donation-images')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) {
                console.error('Upload error:', error);
                alert('Failed to upload image. Please try again.');
                return null;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('donation-images')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Upload error:', error);