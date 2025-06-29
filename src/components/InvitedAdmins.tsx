import { Button, Section } from "./common";
import { adminTxt } from "../constants/texts";

interface invitedAdminsProps {
  invitedAdmins: string[];
  setConfirmModalOpen: (confirmModalOpen: boolean) => void;
  setDeleteEmail: (deleteEmail: string) => void;
}

const InvitedAdmins = ({
  invitedAdmins,
  setConfirmModalOpen,
  setDeleteEmail,
}: invitedAdminsProps) => {
  return (
    <Section title="Invited Admins">
      <div className="max-h-64 overflow-y-auto pr-2">
        {invitedAdmins.length !== 0 ? (
          invitedAdmins
            .slice()
            .reverse()
            .map((user: any) => (
              <div
                key={user.emailId}
                className="flex items-center gap-3 bg-themeBackground border border-border rounded-lg px-4 py-2 mb-3 shadow-sm min-w-0"
              >
                <Button
                  text={adminTxt.removeBtn}
                  onClick={() => {
                    setDeleteEmail(user.emailId);
                    setConfirmModalOpen(true);
                  }}
                />
                <span className="font-medium text-themeText break-words whitespace-pre-line">
                  {user.emailId.slice(0, user.emailId.length - 10)}
                </span>
              </div>
            ))
        ) : (
          <div className="text-themeText/80">{adminTxt.noInvitedAdmins}</div>
        )}
      </div>
    </Section>
  );
};

export default InvitedAdmins;
