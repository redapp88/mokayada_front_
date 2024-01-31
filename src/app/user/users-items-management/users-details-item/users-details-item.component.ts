import {Component, Inject, OnInit} from '@angular/core';
import {AppPhoto} from "../../../models/AppPhoto.model";
import {PhotosService} from "../../../services/photos.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersAddItemComponent} from "../users-add-item/users-add-item.component";
import {ImageMaximizeComponent} from "../../../shared/image-maximize/image-maximize.component";
import {ItemsService} from "../../../services/items.service";
import {environment} from "../../../../environement/environement";
import {Item} from "../../../models/Item.model";

@Component({
  selector: 'app-users-details-item',
  templateUrl: './users-details-item.component.html',
  styleUrls: ['./users-details-item.component.css']
})
export class UsersDetailsItemComponent implements OnInit {


  form: FormGroup;
  errorMessage = "";
  isSavingItem: boolean = false;
  isSavingImages: boolean = false;
  isLoading: boolean = false;
  //*** images ***
  imageDeleteFrom: FormGroup;
  imageurls = [];
  base64String: string;
  name: string;
  imagePath: string;
  statusList:String[]=["Neuf","Occasion"];
  loadedItem: Item;
  currentPhotos:AppPhoto[]=[];
  deletedPhotos:AppPhoto[]=[];

  //***images ***//
  constructor(private itemsService: ItemsService,
              public dialogRef: MatDialogRef<UsersAddItemComponent>,
              private photoService: PhotosService, private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { id: number,title:string }) {
  }

  ngOnInit() {
    this.isSavingItem = false;
    this.isSavingImages = false;
    this.isLoading = true;
    this.errorMessage = "";
    this.itemsService.getItem(this.data.id).subscribe(
      (resData: any) => {

        this.loadedItem = resData;
        console.log(this.loadedItem)
        this.form.get('title').setValue(this.loadedItem.title);
        this.form.get('status').setValue(this.loadedItem.status);
        this.form.get('description').setValue(this.loadedItem.description);
        this.currentPhotos=this.loadedItem.photos;
        this.isLoading = false;

      },
      (error) => {
        this.errorMessage = error
        this.isLoading = false;
      }
    )


    this.form = new FormGroup({

      title: new FormControl(this.loadedItem?.title, {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)]

      }),
      description: new FormControl(this.loadedItem?.description, {
        updateOn: 'change',
        validators: []
      }),
      status: new FormControl(this.loadedItem?.status, {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ),


    })
  }


  onUpdateItem() {
    this.isSavingItem = true;
    this.isSavingImages = false;
    this.errorMessage = "";
    if (this.imageurls.length == 0 && this.currentPhotos.length == 0 ) {
      this.errorMessage = "please select at lease one image"
    } else {
      this.itemsService.update(this.loadedItem.id,this.form.value['title'], this.form.value['status'], this.form.value['description']).subscribe(
        (res: any) => {
          this.isSavingItem = false;
          this.isSavingImages = true;
          let i: number = 0;
          let photos: AppPhoto[] = [];
          this.imageurls.forEach(el => {
            console.log(el)
            let photo: AppPhoto = new AppPhoto(null, el.base64String, null);
            // image.url=el;
            //image.ordre=i;
            console.log(photo)
            i++;
            photos.push(photo)
          })
          this.photoService.updatehotos(res.id,this.deletedPhotos,photos).subscribe(
            (res) => {
              this.isSavingItem = false;
              this.isSavingImages = false;
              this.dialogRef.close('success');
            },
            (error) => {
              this.errorMessage = error.message
              this.isSavingItem = false;
              this.isSavingImages = false;
            }
          )
        },
        (error) => {
          this.isSavingItem = false;
          this.isSavingImages = false;
          this.errorMessage = error.message
        }
      )
      console.log("images :", this.imageurls)
    }
    // console.log( this.form.value['name'],   this.form.value['description'],   this.form.value['type'])
    /*  if(this.form.valid){

      }*/


  }

  //***** images ****
  removeImageEdit(i, imagepath) {
    this.imageDeleteFrom.value.id = i;
    this.imageDeleteFrom.value.ImagePath = imagepath;
  }

  removeImage(i) {
    this.imageurls.splice(i, 1);
  }

  removeLoadedImage(i,photo:AppPhoto) {
    this.deletedPhotos.push(photo);
    this.currentPhotos.splice(i, 1);
  }

  onSelectFile(event) {
    this.errorMessage = "";

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let filename = "";
        var reader = new FileReader();
        let image: HTMLImageElement = new Image();
        reader.onload = (event: any) => {
          image.src = event.target.result;
          //  console.log(event)
          //  console.log(filename=event.target.target);


        }
        image.onload = () => {

          // console.log(image);
          if (image.height < parseInt(`${environment.min_resolution_height }`) || image.width < parseInt(`${environment.min_resolution_width }`)) {
            this.errorMessage = this.errorMessage + " must have a resolution of min <br> 1200x1200"
          }
          else {
            this.imageurls.push({base64String: image.src});
          }
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  public pushImage(url) {
    this.imageurls.push({base64String: url});
  }

//******** images *****
  maximizeImage(url) {
    const dialogRef = this.dialog.open(ImageMaximizeComponent, {
      data: {url: url},
      width: '60%',
    });

  }
}

