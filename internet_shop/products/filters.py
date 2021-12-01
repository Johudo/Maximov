from django.contrib import admin
from django.core.exceptions import ImproperlyConfigured


class InputFilterAdmin(admin.SimpleListFilter):
    template = "admin/text_input_filter.html"

    def lookups(self, request, model_admin):
        # Dummy, required to show the filter.
        return ((),)

    def choices(self, changelist):
        # Grab only the "all" option.
        all_choice = next(super().choices(changelist))
        all_choice["query_parts"] = (
            (k, v)
            for k, v in changelist.get_filters_params().items()
            if k != self.parameter_name
        )
        yield all_choice


class NameFilter(InputFilterAdmin):
    parameter_name = "product_name"
    title = "Название"

    def queryset(self, request, queryset):
        value = self.value()

        if value is None:
            return queryset

        return queryset.filter(name__icontains=value)
