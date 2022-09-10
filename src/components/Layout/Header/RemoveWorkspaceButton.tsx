import TrashIcon from '@/components/icons/TrashIcon';

const RemoveWorkspaceButton = () => {
  return (
    <label
      htmlFor="remove-workspace-modal"
      className="modal-button btn btn-ghost btn-circle"
    >
      <div className="h-6 w-6">
        <TrashIcon></TrashIcon>
      </div>
    </label>
  );
};

export default RemoveWorkspaceButton;
