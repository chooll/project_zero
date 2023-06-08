import { observable } from "mobx";


const SelectedItemStore = observable ({

    selectedItemMenu: null, 
    selectedItemContent: null, 

    setSeletedItemStoreData (selectedItemMenu, selectedItemContent) {
        this.selectedItemMenu = selectedItemMenu;
        this.selectedItemContent = selectedItemContent;
    }
    
})

export default SelectedItemStore; 