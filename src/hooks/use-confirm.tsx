import { Button } from '@/components/ui/button'
import { CommandResponsiveDialog } from '@/components/ui/command'
import React, { useState, JSX } from 'react'

export const useConfirm = (
  title: string,
  description: string
): [() => Promise<boolean>, () => JSX.Element] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void
  } | null>(null)

  const confirm = () => {
    return new Promise<boolean>((resolve) => {
      setPromise({ resolve })
    })
  }

  const handleClose = () => {
    setPromise(null)
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  const ConfirmationDialog = () => {
    return (
      <CommandResponsiveDialog
        open={promise !== null}
        onOpenChange={handleClose}
        title={title}
        description={description}
      >
        <div className="pt-4 w-full flex flex-col-reverse gap-y-4 lg:flex-row items-center justify-end">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="w-full lg:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="secondary"
            className="w-full lg:w-auto"
          >
            Confirm
          </Button>
        </div>
      </CommandResponsiveDialog>
    )
  }

  return [confirm, ConfirmationDialog]
}
