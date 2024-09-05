export interface TaskInterface {
  id: string;
  name: string;
  done: boolean;
  comment?: string;

}
export interface TaskPostInterface extends Omit<TaskInterface, "id"> { }