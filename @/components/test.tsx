/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

import { DataTable } from "./ui/data-table";
import { type Person } from "~/utils/makeData";
import { Profiler, useState } from "react";
import { Button } from "./ui/button";
import Modal from "./modal";

export default function Test({ data }: { data: Person[] }) {
  const columnHelper = createColumnHelper<Person>();
  const columns = [
    columnHelper.accessor("firstName", {}),
    columnHelper.accessor("lastName", {}),
    columnHelper.accessor("age", {}),
    columnHelper.accessor("progress", {}),
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => {
        return (
          <Actions
            person={row.original}
            // onClick={() => {
            //   setSelectedPerson(row.original);
            //   setOpen(true);
            // }}
          />
        );
      },
    }),
  ];
  return (
    <div>
      <Profiler id="MyComponent" onRender={onRender}>
        {/* @ts-expect-error bug */}
        <DataTable columns={columns} data={data} />
      </Profiler>
    </div>
  );
}
function onRender(id: any, phase: any, actualDuration: any, baseDuration: any) {
  console.log(id, phase, actualDuration, baseDuration);
}

function Actions({
  person,
  onClick,
}: {
  person: Person;
  onClick?: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Edit Profile
      </Button>
      <MyModal
        person={person}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
}

function MyModal({
  person,
  open,
  onClose,
}: {
  person: Person;
  open: boolean;
  onClose: () => void;
}) {
  const form = useForm();
  return (
    <Modal
      title="SLOZITY dialog"
      content={
        <div>
          <h1>{person.firstName}</h1>
          <p>
            fksaojfgopasjgopsajopgjasogjsaogjgsojagopjgsjagpjgsojagsopjgspaojgopahjogjsag
          </p>
          <p>
            fksaojfgopasjgopsajopgjasogjsaogjgsojagopjgsjagpjgsojagsopjgspaojgopahjogjsag
          </p>
          <p>
            fksaojfgopasjgopsajopgjasogjsaogjgsojagopjgsjagpjgsojagsopjgspaojgopahjogjsag
          </p>
          <p>
            fksaojfgopasjgopsajopgjasogjsaogjgsojagopjgsjagpjgsojagsopjgspaojgopahjogjsag
          </p>
          <p>
            fksaojfgopasjgopsajopgjasogjsaogjgsojagopjgsjagpjgsojagsopjgspaojgopahjogjsag
          </p>
          <form>
            <input {...form.register("sfa")}>fsaf</input>
          </form>
          <button>close</button>
        </div>
      }
      isVisible={open}
      onClose={onClose}
    />
  );
}
