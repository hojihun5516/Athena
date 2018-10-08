import {action,observable} from 'mobx';

class GroupSelect{
  @observable
  groupId = 'tototodos';

  @action
  setGroupId = (groupId)=>{
    this.groupId=groupId
  }
}
export default GroupSelect;
