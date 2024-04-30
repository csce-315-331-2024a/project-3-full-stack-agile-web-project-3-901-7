import React, { useEffect, useState } from "react";
import { getUserAuth } from "../Login";
import { User } from "../../types/dbTypes";
import { Role, UserType } from "../../types/dbTypes";
import { toTitleCase } from "../../utils/utils";
import Navbar from "../../components/Navbar";

interface IRoleListProps {
  type: UserType;
  roles: Role[];
  updateNewRoleState: (newRole: Role | undefined) => void;
  updateRoleState: (updatedRole: Role) => void;
  insertRole: (newRole: Role) => void;
  saveRole: (updatedRole: Role) => void;
  deleteRole: (toDelete: Role) => void;
}
/**
 * Renders a list of roles for a specific user type.
 * 
 * @param type - The user type.
 * @param roles - The list of roles for the user type.
 * @param updateNewRoleState - Callback function to update the new role state.
 * @param updateRoleState - Callback function to update an existing role state.
 * @param insertRole - Callback function to insert a new role.
 * @param saveRole - Callback function to save an updated role.
 * @param deleteRole - Callback function to delete a role.
 */
const RoleList : React.FC<IRoleListProps> = (props) => {
  /**
   * Updates the role state.
   * 
   * @param updatedRole - The updated role.
   */
  const updateRole = (updatedRole : Role) => {
    if (updatedRole._id >= 0) {
      props.updateRoleState(updatedRole);
    } else {
      props.updateNewRoleState(updatedRole);
    }
  }

  /**
   * Handles the email change event.
   * 
   * @param e - The change event.
   * @param role - The role object.
   */
  const onEmailChange = (e : React.ChangeEvent<HTMLInputElement>, role : Role) => {
    updateRole({...role, email : e.target.value});
  };

  /**
   * Handles the type change event.
   * 
   * @param e - The change event.
   * @param role - The role object.
   */
  const onTypeChange = (e : React.ChangeEvent<HTMLSelectElement>, role : Role) => {
    if (role.type === 'admin' && props.roles.length === 1)
      alert('There must be at least one administrator');
    else
      props.saveRole({...role, type : e.target.value as UserType});
  };

  /**
   * Handles the delete action for a role.
   * 
   * @param role - The role object to delete.
   */
  const onDelete = (role : Role) => {
    if (role.type === 'admin' && props.roles.length === 1)
      alert('There must be at least one administrator');
    else
      props.deleteRole(role)
  }

  /**
   * Saves a new role.
   * 
   * @param role - The new role to save.
   */
  const saveRole = (role : Role) => {
    if (!role)
      return;
    props.updateNewRoleState(undefined);
    props.insertRole(role);
  }

  return (
    <div className="p-4">
      <div className="flex flex-row items-center gap-4 mb-2">
        <label className="block text-gray-700 text-lg font-ptserif">{toTitleCase(props.type)}s</label>
        <button
          onClick={() => props.updateNewRoleState({ _id: -1, email: '', type: props.type })}
        >
          +
        </button>
      </div>

      {props.roles.map(role => (
        <div className="flex flex-row gap-4 p-4">
          <input
            name="email"
            type="email"
            placeholder="hello@gmail.com"
            autoComplete="email"
            value={role.email}
            onChange={(e) => onEmailChange(e, role)}
            onBlur={() => (role._id >= 0) && props.saveRole(role)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && role._id >= 0) {
                props.saveRole(role);
              }
            }}
            className="w-full border rounded px-3 py-2"
            required
          />
          <select 
            value={role.type}
            onChange={(e) => onTypeChange(e, role)}
          >
            <option value={"admin"}>Administrator</option>
            <option value={"manager"}>Manager</option>
            <option value={"cashier"}>Cashier</option>
          </select>

          {role._id < 0 ? (<>
            {/* New Role */}
            <button onClick={() => props.updateNewRoleState(undefined)}>Cancel</button>
            <button onClick={() => saveRole(role)}>Save</button>
          </>) : (<>
            {/* Existing Role */}
            <button onClick={() => onDelete(role)}>Delete</button>  
          </>)}
        </div>
      ))}
    </div>
  );
}

export default function AdminRoles() {
  const [userProfile, setUserProfile] = useState<User | undefined>(undefined);
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRole, setNewRole] = useState<Role | undefined>(undefined);

  const updateRole = (role : Role) => {
    setRoles(prevRoles => prevRoles.map(prevRole => 
      role._id === prevRole._id ? role : prevRole
    ));
  }

  useEffect(() => {
    getUserAuth('admin')
      .then(setUserProfile)
      .catch(console.error);
  }, []);

  async function fetchRoles() {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/role/findAll");
    const data = await response.json();
    setRoles(data);
  }

  async function rolePost(action : string, role : Role) {
    await fetch(import.meta.env.VITE_BACKEND_URL + `/role/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(role),
    });
    await fetchRoles();
  }

  useEffect(() => {
    fetchRoles();
  }, []);

  const rolesByType = (roles: Role[]) => {
    return ['admin', 'manager', 'cashier'].map((userType) => (
      {
        userType: userType as UserType,
        roles: roles.filter(role => 
          role.type == userType
        ),
      }
    ));
  };
  
  return (userProfile &&
    <>
      <Navbar userInfo={userProfile} userType="admin"/>
      <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)'}}>
        {rolesByType(roles.concat(newRole ? [newRole] : [])).map(({userType, roles}) => (
          <RoleList
            type={userType}
            roles={roles}
            updateNewRoleState={setNewRole}
            updateRoleState={updateRole}
            saveRole={(role) => rolePost('edit', role)}
            deleteRole={(role) => rolePost('delete', role)}
            insertRole={(role) => rolePost('insert', role)}
          />
        ))}
      </div>
    </>
  );
}