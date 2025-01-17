interface ErrorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  error?: string;
}

const ErrorModal = ({ open, onOpenChange, error }: ErrorModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Error</DialogTitle>
        <DialogDescription>
          {error || 'An error occurred. Please try again.'}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}; 