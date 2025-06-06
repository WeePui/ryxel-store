import Image from "next/image";
import Button from "@components/UI/Button";

function NotFound() {
  return (
    <div className="mb-32 mt-14 flex w-full flex-col items-center gap-10">
      <div className="relative h-64 w-full">
        <Image src="/404.svg" alt="404" layout="fill" objectFit="contain" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-title text-4xl font-bold uppercase text-primary-default">
          Oopsie !!!
        </h2>
        <p>Khách hàng yêu dấu đang làm gì ở đây vậy?</p>
        <p>Hãy thử tìm kiếm gì đó trên thanh tìm kiếm </p>
        <p className="mb-4 mt-2">hoặc</p>
        <Button href="/admin/dashboard">Trở về Dashboard</Button>
      </div>
    </div>
  );
}

export default NotFound;
