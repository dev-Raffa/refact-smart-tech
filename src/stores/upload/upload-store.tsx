import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ImportedFileData {
  id: string
  fileName: string
  importedAt: string
  fileType: string
  status: string
}

interface UploadStore {
  importedFiles: ImportedFileData[]
  addImportedFile: (fileData: ImportedFileData) => void
  removeImportedFile: (id: string) => void
  clearImportedFiles: () => void
  getImportedFileByName: (fileName: string) => ImportedFileData | undefined
}

export const useUploadStore = create<UploadStore>()(
  devtools(
    (set, get) => ({
      importedFiles: [],

      addImportedFile: (fileData) =>
        set((state) => ({
          importedFiles: [...state.importedFiles, fileData]
        }), false, 'addImportedFile'),

      removeImportedFile: (id) =>
        set((state) => ({
          importedFiles: state.importedFiles.filter(file => file.id !== id)
        }), false, 'removeImportedFile'),

      clearImportedFiles: () =>
        set({ importedFiles: [] }, false, 'clearImportedFiles'),

      getImportedFileByName: (fileName) => {
        const state = get()
        return state.importedFiles.find(file => file.fileName === fileName)
      }
    }),
    { name: 'upload-store' }
  )
)