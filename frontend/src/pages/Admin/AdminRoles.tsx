import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { getUserAuth } from "../Login";
import { User } from "../../types/dbTypes";
import { Role, UserType } from "../../types/dbTypes";
import { toTitleCase } from "../../utils/utils";

interface SerializedRole extends Role {
  id: number;
}

interface IRoleListProps {
  type: UserType;
  roles: SerializedRole[];
  updateRole: (newRole: SerializedRole) => void;
  deleteRole: (id: number) => void;
}

const RoleList : React.FC<IRoleListProps> = (props) => {
  if (props.roles.length === 0)
    return (<> </>);

  return (
    <div className="p-4">
      <label className="block text-gray-700 text-lg font-ptserif mb-2">{toTitleCase(props.type)}s</label>

      {props.roles.map(role => (
        <div className="flex flex-row gap-4 p-4">
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={role.email}
            onChange={(e : React.ChangeEvent<HTMLInputElement>) => props.updateRole({...role, email : e.target.value})}
            className="w-full border rounded px-3 py-2"
            required
          />
          <select 
            value={role.type}
            onChange={(e : React.ChangeEvent<HTMLSelectElement>) => props.updateRole({...role, type : e.target.value as UserType})}
          >
            <option value={"admin"}>Administrator</option>
            <option value={"manager"}>Manager</option>
            <option value={"cashier"}>Cashier</option>
          </select>
          <button
            onClick={() => props.deleteRole(role.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default function AdminRoles() {
  const [userProfile, setUserProfile] = useState<User | undefined>(undefined);
  const [roles, setRoles] = useState<Role[]>([
    { email: 'suryajasper2004@gmail.com', type: 'admin' },
    { email: 'hamza.miranda@yahoo.com', type: 'admin' },
    { email: 'peqieks1uk@hotmail.com', type: 'manager' },
    { email: 'manuel.sharpe@aol.com', type: 'manager' },
    { email: '05jcl6jy4mlycqsnngyt@aol.com', type: 'manager' },
    { email: 'talorcan.long@comcast.net', type: 'cashier' },
    { email: '3psyx8pje4@rediffmail.com', type: 'cashier' },
    { email: 'akram.kline@ymail.com', type: 'cashier' },
    { email: 'lruhheh4xzl@comcast.net', type: 'cashier' },
  ]);

  useEffect(() => {
    getUserAuth('admin')
      .then(setUserProfile)
      .catch(console.error);
  }, []);

  const serializeRoles = (roles: Role[]) => roles.map((role, i) => ({...role, id: i} as SerializedRole));

  const rolesByType = (roles: Role[]) => {
    let serializedRoles = serializeRoles(roles);
    return ['admin', 'manager', 'cashier'].map((userType) => (
      {
        userType: userType as UserType,
        roles: serializedRoles.filter(role => 
          role.type == userType
        ),
      }
    ));
  };

  const updateRole = (newRole : SerializedRole) => {
    setRoles((prevRoles) => {
      const updatedRoles = prevRoles.map((role, i) =>
        i === newRole.id ? newRole : role
      );
      return updatedRoles;
    });
  };

  const deleteRole = (roleId : number) => {
    setRoles((prevRoles) => prevRoles.filter((role, i) => i !== roleId));
  }
  
  return (userProfile &&
    <>
      <AdminNavbar userInfo={userProfile} />
      <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)'}}>
        {rolesByType(roles).map(({userType, roles}) => (
          <RoleList
            type={userType}
            roles={roles}
            updateRole={(newRole) => updateRole(newRole)}
            deleteRole={deleteRole}
          />
        ))}
      </div>
    </>
  );
}