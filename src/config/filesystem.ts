interface FileSystemConfig {
  default: string;
  disks: {
    local: {
      driver: 'local';
      root: string;
      serve: boolean;
      throw: boolean;
    };
    public: {
      driver: 'local';
      root: string;
      url: string;
      visibility: 'public' | 'private';
      throw: boolean;
    };
    supabase: {
      driver: 'supabase';
      bucket: string;
      url: string;
      publicUrl: string;
    };
  };
}

export const fileSystemConfig: FileSystemConfig = {
  // Standard-Speichersystem
  default: import.meta.env.VITE_FILESYSTEM_DISK || 'local',

  // Verfügbare Speichersysteme
  disks: {
    // Lokaler Speicher
    local: {
      driver: 'local',
      root: './storage/app/private',
      serve: true,
      throw: false,
    },

    // Öffentlicher Speicher
    public: {
      driver: 'local',
      root: './storage/app/public',
      url: `${import.meta.env.VITE_APP_URL || ''}/storage`,
      visibility: 'public',
      throw: false,
    },

    // Supabase Storage
    supabase: {
      driver: 'supabase',
      bucket: import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'public',
      url: import.meta.env.VITE_SUPABASE_URL || '',
      publicUrl: `${import.meta.env.VITE_SUPABASE_URL || ''}/storage/v1/object/public`,
    },
  },
};

// Helper-Funktionen
export const getDefaultDisk = () => {
  return fileSystemConfig.disks[fileSystemConfig.default as keyof typeof fileSystemConfig.disks];
};

export const getDisk = (name: keyof typeof fileSystemConfig.disks) => {
  return fileSystemConfig.disks[name];
};

export const getPublicUrl = (path: string, disk: keyof typeof fileSystemConfig.disks = fileSystemConfig.default as keyof typeof fileSystemConfig.disks) => {
  const diskConfig = getDisk(disk);
  
  if (diskConfig.driver === 'supabase') {
    return `${diskConfig.publicUrl}/${diskConfig.bucket}/${path}`;
  }
  
  if (diskConfig.driver === 'local' && 'url' in diskConfig) {
    return `${diskConfig.url}/${path}`;
  }
  
  return path;
};