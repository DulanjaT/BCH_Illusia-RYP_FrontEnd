import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function AdminItemForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    reset();
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1">Item Name</label>
              <Input
                type="text"
                {...register('itemName', { required: 'Item Name is required' })}
              />
              {errors.itemName && <p className="text-red-500 text-sm">{errors.itemName.message}</p>}
            </div>
            <div>
              <label className="block mb-1">Item Amount</label>
              <Input
                type="number"
                {...register('itemAmount', { required: 'Item Amount is required', valueAsNumber: true })}
              />
              {errors.itemAmount && <p className="text-red-500 text-sm">{errors.itemAmount.message}</p>}
            </div>
            <div>
              <label className="block mb-1">Item Description</label>
              <Textarea
                {...register('itemDescription', { required: 'Description is required' })}
              />
              {errors.itemDescription && <p className="text-red-500 text-sm">{errors.itemDescription.message}</p>}
            </div>
            <div>
              <label className="block mb-1">Upload Image</label>
              <Input
                type="file"
                accept="image/*"
                {...register('itemImage', { required: 'Image is required' })}
              />
              {errors.itemImage && <p className="text-red-500 text-sm">{errors.itemImage.message}</p>}
            </div>
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}