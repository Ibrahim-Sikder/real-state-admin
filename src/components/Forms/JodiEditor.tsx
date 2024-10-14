import React, { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { joditConfig as baseConfig } from '@/config';
import { Jodit } from 'jodit-react';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

interface JoditEditorProps {
  name: string;
  label?: string;
}

const ADEditor: React.FC<JoditEditorProps> = ({ name, label }) => {
  const { control } = useFormContext();
  const editor = useRef<Jodit | null>(null);

  const joditConfig = {
    ...baseConfig,
    uploader: {
      ...baseConfig.uploader,
      defaultHandlerSuccess: function (data: any, resp: any) {
        const files = data.files || [];
        if (files.length) {
    
          const editorInstance = editor.current;
          if (editorInstance) {
            editorInstance.selection.insertImage(files[0], null, 200);
          }
        }
      },
    },
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <div>
          {label && <label>{label}</label>}
          <JoditEditor
            ref={editor}
            value={value}
            config={joditConfig}
            onBlur={(newContent: string) => onBlur()}
            onChange={(newContent: string) => onChange(newContent)}
          />
        </div>
      )}
    />
  );
};

export default ADEditor;
