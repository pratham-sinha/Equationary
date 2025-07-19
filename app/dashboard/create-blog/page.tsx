'use client';

import { useState } from 'react';
import { handleBlogSubmission } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import RenderMathText from '@/components/Extras/RenderMathText';

export default function CreateBlogRoute() {
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [input, setInput] = useState('')
  const [showContentPreview,setShowContentPreview]=useState(false);
  const [submitting ,setSubmitting]=useState(false);


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
    alert("Only image files are allowed.");
    return;
  }


  if (file.size > 2 * 1024 * 1024) {
    alert("Max file size is 2MB.");
    return;
  }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();
    setUploading(false);

    if (data.secure_url) {
      setImageUrl(data.secure_url);
    } else {
      alert('Image upload failed.');
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add Post</CardTitle>
          <CardDescription>
            Share your thoughts on Maths, Physics, Tech or anything related.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4" action={handleBlogSubmission}>
            {/* Title */}
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input
                name="title"
                maxLength={50}
                placeholder="Max 50 characters"
                required
                type="text"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
              <Label>Content</Label>
              <Textarea name="content" value={input} placeholder='Latex supported'
        onChange={(e) => setInput(e.target.value)} required />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <Label>Upload Image</Label>
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
              {uploading && <p className="text-sm text-muted"><Loader2 className='animate-spin'/></p>}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              )}


              {/* Injecting uploaded URL into form */}
              <Input name="url" type="hidden" value={imageUrl} required />
            </div>

            
            <Button type="submit" disabled={!imageUrl || submitting} onClick={()=>{setSubmitting(true)}}>
              { submitting? "Posting...":
                "Create Post"
              }
            </Button>
          </form>
        </CardContent>



       <details className="text-sm ml-6 mr-6 border border-gray-300 dark:border-gray-600 rounded-md p-4 shadow-sm ">
      <summary className="cursor-pointer font-semibold text-base">
        📚 LaTeX Quick Guide
      </summary>

      <div className="mt-4 space-y-3 ">
        {[
          { code: '$x^2$'},
          { code: '$\\frac{a}{b}$'},
          { code: '$\\sqrt{x}$'},
          { code: '$\\int x \\, dx$' },
          { code: '$\\sum_{i=1}^{n} i$' },
          { code: '$\\pi$, $\\alpha$, $\\beta$' },
          { code: '$\\left(\\frac{a}{b}\\right)x$'},
          {code:'$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$'}
        ].map((item, idx) => (
          <div key={idx} className="pt-3 flex items-start gap-3">
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-900 dark:text-gray-100 border-1">
              {item.code}
            </code>
            <div className="flex flex-col ">
              <RenderMathText content={item.code} as="span" />
            </div>
          </div>
        ))}
      </div>
    </details>

    <Button 
        variant="outline"  className='h-9 w-25 ml-6 cursor-pointer'
        onClick={() => setShowContentPreview((prev) => !prev)}
      >
        {showContentPreview ? 'Hide Preview' : 'Latex Preview'}
      </Button>
    {showContentPreview && (
          
      
      <div>
        <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-2 ml-6"> Content Preview:</h2>
        <RenderMathText className='break-words p-6' content={input} />
      </div>
    
    )
    
    }
     
       

      </Card>




     
    </div>
  );
}
