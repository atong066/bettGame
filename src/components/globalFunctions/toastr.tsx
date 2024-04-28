import { ca } from 'date-fns/locale';
import { Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toaster.css'
export function ToastrPngk(props: any) {
    const customId = props.id ? props.id : "ee01";
    switch (props.type) {
        case "success":
            return toast.success(props.msg, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
                toastId: customId
            });
        case "error":
            return toast.error(props.msg, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
                toastId: customId
            });
        case "warning":
            return toast.warning(props.msg, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            });
    }


}