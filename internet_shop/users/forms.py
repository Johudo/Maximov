from django import forms
from django.contrib.auth.models import Group, Permission
from django.forms import ModelForm
from django.forms.widgets import DateInput, PasswordInput
from users.models import User
from django.contrib.auth.hashers import make_password


class RegisterForm(ModelForm):

    login = forms.CharField(max_length=100)
    password = forms.CharField(widget=PasswordInput)
    email = forms.EmailField()
    birthday = forms.CharField(widget=DateInput)

    class Meta:
        model = User
        fields = ["login", "password", "email", "birthday"]

    def save(self, commit=True):
        instance = super(RegisterForm, self).save(commit=False)
        instance.password = make_password(instance.password)
        instance.is_staff = True

        if commit:
            instance.save()
            User.objects.get(email=instance.email).groups.add(
                Group.objects.get(name="Пользователь")
            )

        return instance
