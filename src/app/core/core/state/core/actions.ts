import {AuthConnect, AuthUser, AuthUserSettingsChange} from './model';
import {MessageData} from '../../model/error';
import {createAction, props} from '@ngrx/store';

export const init = createAction('[CORE] INIT');
export const initSuccess = createAction('[CORE] Init Success');



export interface NetState {
  online: boolean;
}

export const netState = createAction('[CORE] NetState',
  props<NetState>());



export const authChanged = createAction('[CORE] Auth Changed',
    props<AuthUser>());

export const authUserSettingsChanged = createAction('[CORE] Auth User Settings Change',
  props<AuthUserSettingsChange>());

export const authLogin = createAction('[CORE] Auth Login',
  props<AuthConnect>());

export const authConnect = createAction('[CORE] Auth Connect',
  props<AuthConnect>());


export const authResetPwd = createAction('[CORE] Auth Reset Pwd',
  props<{email: string}>());

export const authResetPwdSuccess = createAction('[CORE] Auth Reset Pwd Success');

export const removeMessage = createAction('[CORE] Remove Message',
  props<{item: any}>());

export const message = createAction('[CORE] Message',
  props<{message: string}>());

export const addError = createAction('[ERROR] Add Error',
  props<{ code: string, message: string }>());

export const authConnectError = createAction('[ERROR] Auth Error Connect',
  props<MessageData>());

export const notificationGrantRequest = createAction('[CORE] Notification Request');

export const notificationGrantSuccess = createAction('[CORE] Notification Granted',
  props<{ token: string }>());

export const notificationGrantExist = createAction('[CORE] Notification Granted Exist',
  props<{ token: string }>());

export const notificationGrantNotExist = createAction('[CORE] Notification Granted Not Exist');

export const notificationGrantForbidden = createAction('[CORE] Notification Not Allowed');

export const removeNotificationGrant = createAction('[CORE] Remove Notification Grant',
  props<{token: string}>() );

export const removeNotificationGrantSuccess = createAction('[CORE] Remove Notification Grant Success');

export const notificationSuccess = createAction('[CORE] Add Notification', props<NotificationData>());

export const removeNotification = createAction('[CORE] Remove Notification', props<RemoveNotification>());


export class NotificationData {
  public data: { type: string, targetId: string, containerId: string };
  public notification: { title: string, body: string, icon?: string };
  public collapse_key: string;
  public from: string;
}

export class RemoveNotification {
  public targetId?: string;
  public containerId?: string;
}

