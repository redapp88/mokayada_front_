
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PhotosService} from "../../../services/photos.service";
import {ItemsService} from "../../../services/items.service";
import {AppPhoto} from "../../../models/AppPhoto.model";
import {environment} from "../../../../environement/environement";
import {ImageMaximizeComponent} from "../../../shared/image-maximize/image-maximize.component";
import {Component, Inject, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-users-add-item',
  templateUrl: './users-add-item.component.html',
  styleUrls: ['./users-add-item.component.css']
})
export class UsersAddItemComponent implements OnInit {



  form: FormGroup;
  errorMessage = "";
  isSavingItem: boolean = false;
  isSavingImages: boolean = false;
  //*** images ***
  imageDeleteFrom: FormGroup;
  imageurls = [];
  base64String: string;
  name: string;
  imagePath: string;
  statusList:String[]=["Neuf","Occasion"];

  //***images ***//
  constructor(private itemsService:ItemsService,
   public dialogRef: MatDialogRef<UsersAddItemComponent>,
    private photoService: PhotosService,private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }) {
  }

  ngOnInit() {
    this.isSavingItem = false;
    this.isSavingImages = false;
    this.errorMessage = "";



    this.form = new FormGroup({

      title: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)]

      }),
      description: new FormControl('', {
        updateOn: 'change',
        validators: []
      }),
      status: new FormControl('', {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ),


    })
    this.form.get('status').setValue(this.statusList[0]);
  }



  onSaveItem() {
    this.isSavingItem = true;
    this.isSavingImages = false;
    this.errorMessage = "";
    if (this.imageurls.length == 0) {
      this.errorMessage = "please select at lease one image"
    } else {
      this.itemsService.
      addItem( this.form.value['title'], this.form.value['status'], this.form.value['description']).subscribe(
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
          this.photoService.addPhotos(res.id, photos).subscribe(
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

  onSelectFile(event) {
    this.errorMessage="";

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let filename="";
        var reader = new FileReader();
        let image: HTMLImageElement = new Image();
        reader.onload = (event: any) => {
          image.src = event.target.result;
        //  console.log(event)
          //  console.log(filename=event.target.target);


        }
        image.onload = () => {

         // console.log(image);
          if(image.height<parseInt(`${environment.min_resolution_height }`) || image.width < parseInt(`${environment.min_resolution_width }`) ){
            this.errorMessage= this.errorMessage+" must have a resolution of min <br> 1200x1200"
          }
          else{
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
      data: {url:url},
      width: '60%',
    });

  }
}
