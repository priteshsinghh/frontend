
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/sheet";
import CommonForm from "../../components/common/form";
import { addProductFormElement } from "../../config";
import ProductImageUpload from "../../components/admin/image-upload";


const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    price: "",
}


function AdminProducts() {

    const [openCreateproductDialog, setOpenCreateProductDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);

    function onSubmit() {

    }

    console.log(formData);
    

    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <button
                    onClick={() => setOpenCreateProductDialog(true)}
                    className="bg-green-500 px-4 py-2 rounded-lg">
                    Add New Product
                </button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">

            </div>
            <Sheet open={openCreateproductDialog} onOpenChange={() => {
                setOpenCreateProductDialog(false)
            }}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>

                        <SheetTitle>Add New product</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload 
                    imageFile={imageFile} 
                    setImageFile={setImageFile} 
                    uploadImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}
                    setImageLoadingState={setImageLoadingState}
                     />
                    <div className="py-6">
                        <CommonForm
                            formControls={addProductFormElement}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText="Add"
                            onSubmit={onSubmit}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}


export default AdminProducts;