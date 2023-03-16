

export class AddReviewDto {
    comment: string;
    stars: number;
    userId: number;
    productId:number;
    type?:string;
}

export default AddReviewDto;