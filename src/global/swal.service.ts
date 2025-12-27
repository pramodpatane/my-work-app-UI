import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class SwalService {
  // method to show alert popup
  public ShowAlert(alerttext: string, message: string) {
    const key = alerttext.toLowerCase();

    let icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'info';

    if (key.includes('success')) icon = 'success';
    else if (key.includes('error') || key.includes('failed')) icon = 'error';
    else if (key.includes('warning') || key.includes('alert')) icon = 'warning';
    else if (key.includes('info')) icon = 'info';
    else if (key.includes('confirm')) icon = 'question';

    Swal.fire({
      title: alerttext,
      text: message,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }
}