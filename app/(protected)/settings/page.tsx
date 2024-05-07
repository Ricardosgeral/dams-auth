"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState, useTransition, useEffect } from "react";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";

import { SettingsSchema, DeleteAccountSchema } from "@/schemas";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useCurrentUser } from "@/hooks/use-current-user";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { UserRole } from "@prisma/client";
import { deleteAccount } from "@/actions/delete-account";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [errorDelete, setErrorDelete] = useState("");
  const [successDelete, setSuccessDelete] = useState("");

  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      newPassword: "",
      role: user?.role || "USER",
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    },
  });

  const formDelete = useForm<z.infer<typeof DeleteAccountSchema>>({
    resolver: zodResolver(DeleteAccountSchema),
    defaultValues: {
      delete: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  const onSubmitDeleteAccount = (
    values: z.infer<typeof DeleteAccountSchema>
  ) => {
    startTransition(() => {
      deleteAccount(values)
        .then((data) => {
          if (data.errorDelete) {
            setErrorDelete(data.errorDelete);
          }
          if (data.successDelete) {
            setSuccessDelete(data.successDelete);
          }
        })
        .catch(() => setErrorDelete("Something went wrong"));
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-md font-semibold text-center"> ⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="name"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="email"
                            type="email"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="password"
                            type="password"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New password | Confirm password </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="new password"
                            type="password"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={UserRole.ADMIN}>
                              Admin
                            </SelectItem>
                            <SelectItem value={UserRole.USER}>User</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isTwoFactorEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row itens-center justify-between rounded-md shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel> Two Factor Authentication</FormLabel>
                          <FormDescription>
                            Enable two factor Authentication for your account
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            disabled={isPending}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </form>
        </Form>
        <div className="flex flex-col space-y-1.5 p-6">
          <hr className="w-80 mx-auto" />
        </div>

        <Form {...formDelete}>
          <form
            className="space-y-6"
            onSubmit={formDelete.handleSubmit(onSubmitDeleteAccount)}
          >
            <div className="space-y-4">
              <FormField
                control={formDelete.control}
                name="delete"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="space-y-4">
                        <h1 className="font-bold text-red-500">
                          Delete Account
                        </h1>
                        <p>
                          😟This action cannot be undone. To delete your
                          account, write
                        </p>
                        <Badge variant="outline">DELETE</Badge>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={errorDelete} />
            <FormSuccess message={successDelete} />
            <Button variant="destructive" type="submit" disabled={isPending}>
              Delete
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
