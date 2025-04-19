import { Link, NavLink, Outlet } from 'react-router';
import { useAuth } from '../context/authContext';
import { Button } from 'flowbite-react';

export function Header() {
  const { accessToken, action, user } = useAuth();

  console.log('render: Header()');

  return (
    <>
      <nav className="flex justify-end gap-4 items-center px-[5vw] py-8">
        <NavLink to="/">Home</NavLink>
        {accessToken ? (
          <>
            <NavLink to="/user/receipts/inbox">Inbox</NavLink>
            <button onClick={action.removeAccessToken}>Sign Out</button>
            {/* TODO: replace button_link wrapper to link only with style as button*/}

            <Link to="/user/receipts/upload">
              <Button outline>Add Receipt</Button>
            </Link>
            <div className="flex items-center gap-1 justify-center border-l-2 pl-2">
              <svg
                className="w-5 h-5 text-green-400 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Hi <strong>{user?.firstName}!</strong>
              </span>
            </div>
          </>
        ) : (
          <>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </nav>
      <div className="mx-[10vw]">
        <h1 className="text-6xl text-center font-bold mb-7">Receipt Center</h1>

        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
