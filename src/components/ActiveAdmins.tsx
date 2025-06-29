import { adminTxt } from "../constants/texts";
import { Button, Section } from "./common";

interface ActiveAdminsProps {
  activeAdmins: string[];
  setActiveAdmins: (activeAdmins: string[]) => void;
  setConfirmModalOpen: (confirmModalOpen: boolean) => void;
  setDeleteEmail: (deleteEmail: string) => void;
}

const ActiveAdmins = ({
  activeAdmins,
  setConfirmModalOpen,
  setDeleteEmail,
}: ActiveAdminsProps) => {
  return (
    <Section title="Active Admins">
      <div className="max-h-64 overflow-y-auto pr-2">
        {activeAdmins.length !== 0 ? (
          activeAdmins.map((admin: any) => (
            <div
              key={admin.emailId}
              className="flex items-center gap-3 bg-themeBackground border border-border rounded-lg px-4 py-2 mb-3 shadow-sm min-w-0"
            >
              <div className="flex items-center gap-4">
                <Button
                  text={adminTxt.removeBtn}
                  onClick={() => {
                    setDeleteEmail(admin.emailId);
                    setConfirmModalOpen(true);
                  }}
                />
                <div className="font-medium">
                  <div>{admin.emailId.slice(0, admin.emailId.length - 10)}</div>
                  <div className="text-sm text-themeText/50">
                    {adminTxt.joined + admin.createdAt.slice(0, 10)}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-themeText/80">{adminTxt.noActiveAdmins}</div>
        )}
      </div>
    </Section>
  );
};

export default ActiveAdmins;
