import Swal from 'sweetalert2';

export function checkTokenAndRedirect(navigate) {
    const storedToken = localStorage.getItem('Token');
    if (storedToken === null) {
        navigate('/Login');
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'กรุณาล็อคอิน',
            showConfirmButton: false,
            timer: 3500,
        })
    }
}